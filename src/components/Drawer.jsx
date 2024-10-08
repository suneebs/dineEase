'use client';

import { Drawer } from 'vaul';
import { useDrawer } from './DrawerContext';
import { Button } from './ui/button';

export default function VaulDrawer() {
  const { isOpen, closeDrawer, cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart } = useDrawer();

  // Calculate total cost
  const totalCost = cartItems.reduce((total, item) => total + item.rate * item.quantity, 0);

  // Function to handle order placement
  const handleOrder = () => {
    // Here you can add logic to handle the order (e.g., sending it to an API)
    console.log('Order placed:', cartItems);
    // Optionally clear the cart after placing the order
    // clearCart(); // You would need to implement a clearCart function in your context
    closeDrawer(); // Close the drawer after placing the order
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={closeDrawer}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" onClick={closeDrawer} />
        <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 md:left-1/4 right-0 outline-none max-w-xl">
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
    </Drawer.Root>
  );
}