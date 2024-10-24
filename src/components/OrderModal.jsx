import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { db } from '@/firebase'; // Import your Firebase config
import { collection, onSnapshot } from 'firebase/firestore'; // Import Firestore methods

const OrderModal = ({ onClose, onAddMore, onGenerateBill, orderDetails, timerActive, setTimerActive }) => {
  const [timeLeft, setTimeLeft] = useState(5); // Set this to the time you want in seconds
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Start timer effect
  useEffect(() => {
    let timer;
    if (timerActive) {
      setOrderPlaced(true); // Set order as placed
      setTimeLeft(5); // Reset timer to 5 seconds

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setOrderPlaced(false); // Reset order placed state
            setTimerActive(false); // Stop timer
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timerActive]); // Run timer effect based on timerActive

  // Monitor Firebase for changes and restart timer if new orders are placed
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Bills'), (snapshot) => {
      if (!snapshot.empty && orderPlaced) {
        setTimerActive(true); // Restart the timer if there are updates
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [orderPlaced]); // Trigger effect based on orderPlaced state

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold">{orderPlaced ? "Yay! Order Placed!" : "Enjoy your food!"}</h2>
        <p className="mt-2">
          {timeLeft === 0 ? "Your food has arrived!" : `Your order will be at your table within ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
        </p>

        {/* Show order details */}
        {orderDetails && (
          <div className="mt-4">
            <h3 className="font-bold">Order Details:</h3>
            {orderDetails.map(item => (
              <div key={item.name} className="flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>₹ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-4">
          {timeLeft === 0 ? (
            <>
              <Button className="bg-green-500 hover:bg-green-700" onClick={onAddMore}>
                Add More
              </Button>
              <Button className="bg-green-500 hover:bg-green-700 ml-3" onClick={onGenerateBill}>GENERATE BILL</Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
