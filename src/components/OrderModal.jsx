import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const OrderModal = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 5 minutes in seconds
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setOrderPlaced(true);
    }
  }, [timeLeft]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold">{orderPlaced ? "Enjoy your food!" : "Yay! Order Placed!"}</h2>
        <p className="mt-2">
          {orderPlaced ? "Your food has arrived!" : `Your order will be at your table within ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
        </p>
        <div className="flex justify-end mt-4">
          <Button className="bg-green-500 hover:bg-green-700" onClick={onClose}>
            {orderPlaced ? "Add More Food" : "Close"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
