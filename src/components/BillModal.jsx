import React from 'react';
import { Button } from './ui/button';

const BillModal = ({ cartItems, totalCost, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center w-full max-w-md">
        <h2 className="text-lg font-bold">Your Bill</h2>
        <div className="mt-4">
          {cartItems.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span>{item.title} (x{item.quantity})</span>
                <span>₹ {item.rate * item.quantity}</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-4">
          <span className="font-bold">Total Cost: ₹ {totalCost}</span>
        </div>
        <div className="mt-4">
          <Button className="bg-blue-500 hover:bg-blue-700" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
