import React from 'react';
import { Button } from './ui/button';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';  // Firestore imports
import { db } from '@/firebase'; // Import your firebase config

const handleDeleteTable = async (selectedSeat) => {
  
    try {
      // Get the document for the selected seat
      const tableDoc = doc(db, 'Table Order', `${selectedSeat}`);
      const tableSnapshot = await getDoc(tableDoc);

      if (tableSnapshot.exists()) {
        const tableData = tableSnapshot.data();

        // Check if the fields are null (i.e., table is available)
        if (tableData.customerName && tableData.phoneNumber) {
          // Proceed with booking since the table is available
          await setDoc(tableDoc, {
            customerName: "",
            phoneNumber: "",
          });
          // alert(`Table ${selectedSeat} is deleted from db`);

        } else {
          // Table is already booked
          alert(`Table ${selectedSeat} is not deleted!`);
        }
      }
    } catch (error) {
      console.error('Error deleting table:', error);
      alert('Failed to delete table. Please try again.');
    }
};

const BillModal = ({ cartItems, totalCost, onClose,selectedSeat }) => {

  const handleClose = async() => {

    await handleDeleteTable(selectedSeat);
    // Call the onClose function passed as a prop
    onClose();
    console.log("BILL MODAL:", selectedSeat);
    
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