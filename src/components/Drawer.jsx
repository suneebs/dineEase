'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';
import { useDrawer } from './DrawerContext';
import { Button } from './ui/button';
import OrderModal from './OrderModal';
import BillModal from './BillModal';

export default function VaulDrawer() {
  const { isOpen, openDrawer, closeDrawer, cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart,selectedSeat } = useDrawer();
  
  // Modal states
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isBillModalOpen, setBillModalOpen] = useState(false);
  console.log("IN DRAWER: ",selectedSeat);
  
  // Calculate total cost
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle order placement
  const handleOrder = () => {
    console.log('Order placed:', cartItems);
    setOrderModalOpen(true); // Open the Order modal
    closeDrawer(); // Close the drawer after placing the order
  };

  // Function to handle generating the bill
  const handleGenerateBill = () => {
    setBillModalOpen(true); // Open the Bill modal
  };

  // Handle "Add More" functionality
  const handleAddMore = () => {
    openDrawer(); // Reopen the drawer to allow adding more items
    setOrderModalOpen(false); // Close the order modal
  };

  // Function to handle closing bill modal
  const handleCloseBillModal = () => {
    setBillModalOpen(false); // Close the bill modal
    // Optional: Clear cart only after bill generation, if needed
    // clearCart(); 
  };

  return (
    <>
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
                    <div key={item.name} className="flex justify-between border-b py-2 items-center">
                      <span>{item.name} (x{item.quantity})</span>
                      <div className="flex items-center">
                        <Button onClick={() => decreaseQuantity(item.name)}>-</Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button onClick={() => increaseQuantity(item.name)}>+</Button>
                        <Button className="ml-2 bg-red-500 hover:bg-red-700" onClick={() => removeItemFromCart(item.name)}>Remove</Button>
                      </div>
                      <span>₹ {item.price * item.quantity}</span>
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
        {isOrderModalOpen && (
          <OrderModal 
            onClose={() => setOrderModalOpen(false)} 
            onGenerateBill={handleGenerateBill} 
            onAddMore={handleAddMore}  // Handle "Add More"
          />
        )}
      </Drawer.Root>

      {/* Render the BillModal when the Generate Bill button is clicked */}
      {isBillModalOpen && (
        <BillModal
          cartItems={cartItems}  // Pass the cart items to the bill
          totalCost={totalCost}   // Pass the total cost to the bill
          onClose={handleCloseBillModal}  // Close the bill modal
          selectedSeat={selectedSeat}
        />
      )}
    </>
  );
}
