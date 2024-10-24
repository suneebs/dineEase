import React, { useEffect, useState } from 'react';
import { db } from '@/firebase'; // Import your Firebase config
import { collection, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredBills, setFilteredBills] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  // Fetch all bills from Firestore
  useEffect(() => {
    const billsCollection = collection(db, 'Bills');
    const unsubscribe = onSnapshot(billsCollection, (snapshot) => {
      const fetchedBills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBills(fetchedBills);
      calculateTotalRevenue(fetchedBills);
    });

    return () => unsubscribe();
  }, []);

  const calculateTotalRevenue = (bills) => {
    const total = bills.reduce((sum, bill) => sum + bill.totalCost, 0);
    setTotalRevenue(total);
  };

  useEffect(() => {
    if (selectedDate) {
      const filtered = bills.filter(bill => {
        const billDate = bill.timestamp.toDate().toLocaleDateString('en-CA');
        return billDate === selectedDate;
      });
      setFilteredBills(filtered);
      calculateDailyRevenue(filtered);
    } else {
      setFilteredBills([]);
      setDailyRevenue(0);
    }
  }, [selectedDate, bills]);

  const calculateDailyRevenue = (filtered) => {
    const dailyTotal = filtered.reduce((sum, bill) => sum + bill.totalCost, 0);
    setDailyRevenue(dailyTotal);
  };

  const handleFetchOrderDetails = async () => {
    if (!orderId) return;
    const orderDoc = doc(db, 'Bills', orderId);
    const orderSnapshot = await getDoc(orderDoc);
    
    if (orderSnapshot.exists()) {
      setOrderDetails({ id: orderSnapshot.id, ...orderSnapshot.data() });
    } else {
      setOrderDetails(null);
    }
  };

  // New delete function
  const handleDeleteOrder = async (orderId) => {
    if (!orderId) return;
    const orderDoc = doc(db, 'Bills', orderId);
    
    try {
      await deleteDoc(orderDoc);
      // alert(`Order with ID ${orderId} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bills Overview</h1>
      <div className="mb-4">
        <label className="block mb-2">Filter by Date:</label>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
          className="border p-2 rounded"
        />
      </div>

      <h2 className="font-semibold">Total Revenue: ₹ {totalRevenue}</h2>
      <h2 className="font-semibold">Daily Revenue for {selectedDate}: ₹ {dailyRevenue}</h2>

      <div className="mb-4">
        <label className="block mb-2">Enter Order ID:</label>
        <input 
          type="text" 
          value={orderId} 
          onChange={(e) => setOrderId(e.target.value)} 
          className="border p-2 rounded"
        />
        <Button onClick={handleFetchOrderDetails} className="ml-2">Get Order Details</Button>
      </div>

      {orderDetails && (
        <div className="mt-4">
          <h2 className="font-semibold">Order Details:</h2>
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Total Cost:</strong> ₹ {orderDetails.totalCost}</p>
          <p><strong>Date:</strong> {orderDetails.timestamp.toDate().toLocaleDateString()}</p>
          <h3 className="mt-2">Items:</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} (x{item.quantity}): ₹ {item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}

      <table className="w-full border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Total Cost</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {(selectedDate ? filteredBills : bills).map(bill => (
            <tr key={bill.id}>
              <td className="border p-2">{bill.id}</td>
              <td className="border p-2">₹ {bill.totalCost}</td>
              <td className="border p-2">{bill.timestamp.toDate().toLocaleDateString()}</td>
              <td className="border p-2">
                <Button onClick={() => handleDeleteOrder(bill.id)} className="bg-red-500 text-white">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillsPage;
