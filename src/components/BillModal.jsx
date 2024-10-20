import React from 'react';
import { Button } from './ui/button';

const BillModal = ({ cartItems, totalCost, onClose }) => {

  const handleClose = () => {
    // Call the onClose function passed as a prop
    onClose();
    
    // Refresh the page after closing the modal
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold">Your Bill</h2>
        <div className="mt-4">
          {cartItems.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.name}>
                  {item.name} (x{item.quantity}) - ₹ {item.price * item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-4 font-bold">Total Cost: ₹ {totalCost}</p>
        <Button className="bg-blue-500 hover:bg-blue-700 mt-4" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default BillModal;
