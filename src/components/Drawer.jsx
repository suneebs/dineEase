import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { useDrawer } from './DrawerContext';
import { Button } from './ui/button';
import OrderModal from './OrderModal';
import BillModal from './BillModal';
import { db } from '@/firebase'; // Import your Firebase config
import { collection, addDoc, updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore'; // Import Firestore methods

export default function VaulDrawer() {
  const { isOpen, openDrawer, closeDrawer, cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart, removeAllItemsFromCart, selectedSeat } = useDrawer();

  // Modal states
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isBillModalOpen, setBillModalOpen] = useState(false);
  
  // Order details state
  const [orderDetails, setOrderDetails] = useState([]); // Entire order history
  const [timerActive, setTimerActive] = useState(false); // Track if the timer is active
  const [orderId, setOrderId] = useState(null); // Track order document ID

  // Calculate total cost for the drawer
  const drawerTotalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate total cost for order details
  const totalCost = orderDetails.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle order placement
  const handleOrder = async () => {
    setOrderDetails(cartItems); // Store cart items as order details

    try {
      if (!orderId) {
        // Create a new order document if there's no orderId
        const docRef = await addDoc(collection(db, 'Bills'), {
          items: cartItems,
          totalCost: drawerTotalCost,
          selectedSeat: selectedSeat,
          timestamp: new Date()
        });

        // Set the orderId in the document
        await updateDoc(docRef, { orderId: docRef.id });
        setOrderId(docRef.id); // Save the document ID for future updates
      } else {
        // Fetch the existing order
        const existingOrderDoc = await getDoc(doc(db, 'Bills', orderId));
        if (existingOrderDoc.exists()) {
          const existingItems = existingOrderDoc.data().items || [];

          // Merge the new items with the existing ones
          const updatedItems = [...existingItems];

          cartItems.forEach((newItem) => {
            const existingItemIndex = updatedItems.findIndex(item => item.name === newItem.name);
            if (existingItemIndex !== -1) {
              // If the item already exists, increase its quantity
              updatedItems[existingItemIndex].quantity += newItem.quantity;
            } else {
              // If the item does not exist, add it as a new item
              updatedItems.push(newItem);
            }
          });

          // Update the document with merged items
          await updateDoc(doc(db, 'Bills', orderId), {
            items: updatedItems,
            totalCost: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0), // Recalculate the total cost
            timestamp: new Date()
          });
          setOrderDetails(updatedItems); // Update the order details
        }
      }

      setOrderModalOpen(true); // Open the Order modal
      closeDrawer(); // Close the drawer after placing the order
      setTimerActive(true); // Activate the timer
    } catch (error) {
      console.error("Error placing order: ", error);
      setTimerActive(false); // Ensure timer is not active if there's an error
    }
  };

  // Function to handle generating the bill
  const handleGenerateBill = async () => {
    if (!orderId) return; // No orderId, no bill to generate

    try {
      // Fetch the existing order from Firestore
      const existingOrderDoc = await getDoc(doc(db, 'Bills', orderId));

      if (existingOrderDoc.exists()) {
        const data = existingOrderDoc.data();
        const existingItems = data.items || [];

        // Calculate the total cost again, just in case
        const totalCost = existingItems.reduce((total, item) => total + item.price * item.quantity, 0);

        // Open the Bill modal and pass the entire order history
        setBillModalOpen(true); 
        setOrderDetails(existingItems); // Set the order details to the fetched items
      }
    } catch (error) {
      console.error("Error generating bill: ", error);
    }
  };

  // Handle "Add More" functionality
  const handleAddMore = async () => {
    removeAllItemsFromCart();
    try {
      await updateDoc(doc(db, 'Bills', orderId), {
        items: cartItems,
        totalCost: drawerTotalCost,
        timestamp: new Date()
      });
      setTimerActive(true); // Restart the timer
      setOrderModalOpen(false); // Close the order modal
    } catch (error) {
      console.error("Error updating order: ", error);
    }
  };

  // Function to handle closing bill modal
  const handleCloseBillModal = () => {
    setBillModalOpen(false); // Close the bill modal
  };

  // Listen for updates in the order document
  useEffect(() => {
    if (orderId) {
      const unsubscribe = onSnapshot(doc(db, 'Bills', orderId), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const fetchedItems = data.items || [];
          setOrderDetails(fetchedItems); // Update the order details with the fetched items
        }
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [orderId]);

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
                  <span className="font-bold">Total Cost: ₹ {drawerTotalCost}</span> {/* Updated to drawerTotalCost */}
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
            orderDetails={orderDetails} // Pass the order details
            timerActive={timerActive}    // Pass timer state
            setTimerActive={setTimerActive} // Allow resetting timer state
          />
        )}
      </Drawer.Root>

      {/* Render the BillModal when the Generate Bill button is clicked */}
      {isBillModalOpen && (
        <BillModal
          cartItems={orderDetails}  // Pass the entire order history
          totalCost={totalCost}   // Pass the recalculated total cost
          onClose={handleCloseBillModal}  // Close the bill modal
          selectedSeat={selectedSeat}
        />
      )}
    </>
  );
}
