import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

const TableOrderDetailsPage = () => {
  const [tableOrders, setTableOrders] = useState([]);

  useEffect(() => {
    const fetchTableOrders = async () => {
      try {
        const tableOrdersSnapshot = await getDocs(collection(db, 'Table Order'));
        const orders = tableOrdersSnapshot.docs
          .map((doc) => ({
            tableNumber: doc.id,
            customerName: doc.data().customerName,
            phoneNumber: doc.data().phoneNumber,
          }))
          .filter(order => order.customerName && order.phoneNumber);
        setTableOrders(orders);
      } catch (error) {
        console.error('Error fetching table orders:', error);
      }
    };

    fetchTableOrders();
  }, []);

  const handleClearFields = async (tableNumber) => {
    try {
      const tableDocRef = doc(db, 'Table Order', tableNumber);
      await updateDoc(tableDocRef, {
        customerName: null,
        phoneNumber: null,
      });
      alert(`Fields cleared for table ${tableNumber}.`);
      
      // Update UI by fetching data again
      setTableOrders(prevOrders =>
        prevOrders.map(order =>
          order.tableNumber === tableNumber
            ? { ...order, customerName: null, phoneNumber: null }
            : order
        )
      );
    } catch (error) {
      console.error('Error clearing fields:', error);
      alert('Failed to clear fields. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center font-serif">Table Order Details</h1>
      <div className="overflow-auto bg-white shadow-md rounded p-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Table Number</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Customer Name</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Phone Number</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableOrders.map((order) => (
              <tr key={order.tableNumber}>
                <td className="py-2 px-4 border-b border-gray-300">{order.tableNumber}</td>
                <td className="py-2 px-4 border-b border-gray-300">{order.customerName || '-'}</td>
                <td className="py-2 px-4 border-b border-gray-300">{order.phoneNumber || '-'}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleClearFields(order.tableNumber)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Clear
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tableOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No booked tables available.</p>
        )}
      </div>
    </div>
  );
};

export default TableOrderDetailsPage;
