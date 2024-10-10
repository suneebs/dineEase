import React from 'react';
import { Button } from './ui/button';

const BillModal = ({ cartItems, totalCost, onClose }) => {
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
                <li key={item.id}>
                  {item.title} (x{item.quantity}) - ₹ {item.rate * item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-4 font-bold">Total Cost: ₹ {totalCost}</p>
        <Button className="bg-blue-500 hover:bg-blue-700 mt-4" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default BillModal;
