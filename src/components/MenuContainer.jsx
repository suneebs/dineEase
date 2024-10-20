import React, { useState, useEffect } from 'react';
import Search from './CarouselandSearch';
import MenuItems from './MenuItems';
import { CarouselSpacing } from './Carousel';
import FoodTypeFilter from './FoodTypeFilter';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Import your Firebase config

const MenuContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedFoodType, setSelectedFoodType] = useState('ALL');
  const [selectedSeat, setSelectedSeat] = useState('1'); // Default to table 1
  const [customerDetails, setCustomerDetails] = useState(null); // Store customer details
  const [inputPhone, setInputPhone] = useState(''); // Store the phone number input from user
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is authenticated
  const [errorMessage, setErrorMessage] = useState(''); // Store error message for invalid authentication

  // Fetch customer details for selected seat
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const tableDoc = doc(db, 'Table Order', `${selectedSeat}`);
        const tableSnapshot = await getDoc(tableDoc);

        if (tableSnapshot.exists()) {
          const tableData = tableSnapshot.data();
          if (tableData.customerName && tableData.phoneNumber) {
            setCustomerDetails({
              customerName: tableData.customerName,
              phoneNumber: tableData.phoneNumber,
            });
            setIsAuthenticated(false); // Reset authentication when a table is booked
          } else {
            setCustomerDetails(null); // No customer details available, allow direct access
            setIsAuthenticated(true); // Allow access to menu without authentication
          }
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setCustomerDetails(null);
      }
    };

    fetchCustomerDetails();
  }, [selectedSeat]);

  // Handle phone number validation
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (customerDetails && customerDetails.phoneNumber === inputPhone) {
      setIsAuthenticated(true); // Correct phone number, allow access to the menu
      setErrorMessage(''); // Clear error message
    } else {
      setIsAuthenticated(false);
      setErrorMessage('Phone number does not match. Please try again.'); // Show error if phone number doesn't match
    }
  };

  return (
    <div>
      {/* Seat selection dropdown at the top */}
      <section className='mb-6 lg:ml-96 lg:mr-96'>
        <label htmlFor="seat-select" className="block mb-2 text-sm font-bold text-gray-700">Select Table:</label>
        <select
          id="seat-select"
          value={selectedSeat}
          onChange={(e) => {
            setSelectedSeat(e.target.value);
            setIsAuthenticated(false); // Reset authentication when a new seat is selected
            setInputPhone(''); // Clear phone input field when selecting a new table
          }}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((seat) => (
            <option key={seat} value={seat}>
              Table {seat}
            </option>
          ))}
        </select>
      </section>

      {/* Phone number input form for authentication if the table is booked */}
      {!isAuthenticated && customerDetails && (
        <section className="mb-6 lg:ml-96 lg:mr-96">
          <h2 className="text-lg font-bold">Enter Phone Number to Access the Menu</h2>
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="tel"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <button type="submit" className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Submit
            </button>
          </form>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </section>
      )}

      {/* Display welcome message and menu if authenticated */}
      {isAuthenticated && customerDetails && (
        <section className="mb-6 lg:ml-96 lg:mr-96">
          <h2 className="text-lg font-bold">Welcome, {customerDetails.customerName}!</h2>
          <p>You are now authenticated for Table {selectedSeat}. You can access the menu below.</p>
        </section>
      )}

      {/* Display menu items if authenticated or no booking exists */}
      {isAuthenticated && (
        <>
          <section className=''>
            <Search setSearchTerm={setSearchTerm} />
          </section>

          <section>
            <CarouselSpacing setSelectedCategory={setSelectedCategory} />
          </section>

          <section>
            <FoodTypeFilter setSelectedFoodType={setSelectedFoodType} />
          </section>

          <section className='mt-20'>
            <MenuItems
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedFoodType={selectedFoodType}
              selectedSeat={selectedSeat} // Pass selected seat to MenuItems
            />
          </section>
        </>
      )}
    </div>
  );
};

export default MenuContainer;
