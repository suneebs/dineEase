'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';
import { useDrawer } from './DrawerContext';
import { Button } from './ui/button';
import OrderModal from './OrderModal'; // Import the OrderModal

export default function VaulDrawer() {
  const { isOpen, closeDrawer, cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart,clearCart } = useDrawer();
  
  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  
  // Calculate total cost
  const totalCost = cartItems.reduce((total, item) => total + item.rate * item.quantity, 0);

  // Function to handle order placement

  const handleOrder = () => {
    console.log('Order placed:', cartItems);
    clearCart();
    setModalOpen(true); // Open the modal
    closeDrawer(); // Close the drawer after placing the order
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={closeDrawer}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" onClick={closeDrawer} />
        <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 md:left-1/4 md:right-1/4 outline-none w-full md:w-auto">
          <div className="p-4 bg-white">
            <div className='flex justify-end'>
              <Button className="bg-red-500 hover:bg-red-700" onClick={closeDrawer}>X</Button>
            </div>
            <div>
              {cartItems.length === 0 ? (
                <p>No items in the cart.</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex justify-between border-b py-2 items-center">
                    <span>{item.title} (x{item.quantity})</span>
                    <div className="flex items-center">
                      <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                      <Button className="ml-2 bg-red-500 hover:bg-red-700" onClick={() => removeItemFromCart(item.id)}>Remove</Button>
                    </div>
                    <span>₹ {item.rate * item.quantity}</span>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="mt-4">
                <span className="font-bold">Total Cost: ₹ {totalCost}</span>
                <div className="flex justify-end mt-4">
                  <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleOrder}>
                    Order
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
      {isModalOpen && <OrderModal onClose={() => { setModalOpen(false); /* Optionally add logic to navigate back to the menu or add more items */ }} />}
    </Drawer.Root>
  );
}
