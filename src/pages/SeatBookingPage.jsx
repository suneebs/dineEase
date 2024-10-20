import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have this Button component
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router-dom for navigation
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';  // Firestore imports
import { db } from '@/firebase'; // Import your firebase config

const SeatBookingPage = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);  // Track which seats are booked
  const navigate = useNavigate();

  // Fetch booked seat information when the component loads
  useEffect(() => {
    const fetchBookedSeats = async () => {
      const seatsSnapshot = await getDocs(collection(db, 'Table Order'));
      const booked = seatsSnapshot.docs
        .filter(doc => doc.data().customerName && doc.data().phoneNumber)  // Check if seat is booked
        .map(doc => parseInt(doc.id));  // Convert doc id (seat number) to an integer
      setBookedSeats(booked);
    };

    fetchBookedSeats();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      setIsFormSubmitted(true);
      alert('Form submitted successfully!');
    } else {
      alert('Please enter both your name and phone number.');
    }
  };

  const bookSeat = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleBookSeatClick = async () => {
    if (selectedSeat && name && phone) {
      try {
        // Get the document for the selected seat
        const tableDoc = doc(db, 'Table Order', `${selectedSeat}`);
        const tableSnapshot = await getDoc(tableDoc);

        if (tableSnapshot.exists()) {
          const tableData = tableSnapshot.data();

          // Check if the fields are null (i.e., table is available)
          if (!tableData.customerName && !tableData.phoneNumber) {
            // Proceed with booking since the table is available
            await setDoc(tableDoc, {
              customerName: name,
              phoneNumber: phone,
            });
            alert(`Seat ${selectedSeat} booked and details saved to Firebase!`);

            // Redirect to the menu page with state
            navigate('/menu', { state: { canOrder: false } });  // Disable order button on menu page
          } else {
            // Table is already booked
            alert(`Seat ${selectedSeat} is already booked. Please choose another seat.`);
          }
        }
      } catch (error) {
        console.error('Error booking seat:', error);
        alert('Failed to book seat. Please try again.');
      }
    } else {
      alert('Please select a seat.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Seat</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </Button>
      </form>

      {isFormSubmitted && (
        <div>
          <p className="mb-4">Welcome, {name}! Please select a seat below:</p>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((seat) => (
              <Button 
                key={seat} 
                className={`p-4 ${bookedSeats.includes(seat) ? 'bg-red-500' : (selectedSeat === seat ? 'bg-green-500' : 'bg-gray-300')} hover:bg-gray-400`}
                onClick={() => !bookedSeats.includes(seat) && bookSeat(seat)}  // Disable booking for already booked seats
                disabled={bookedSeats.includes(seat)}  // Disable the button if the seat is already booked
              >
                Seat {seat}
              </Button>
            ))}
          </div>

          {selectedSeat && (
            <div className="mt-6">
              <Button 
                onClick={handleBookSeatClick} 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Book Seat
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeatBookingPage;
