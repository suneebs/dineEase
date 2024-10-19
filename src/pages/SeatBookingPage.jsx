import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have this Button component
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router-dom for navigation

const SeatBookingPage = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

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

  const handleBookSeatClick = () => {
    // Perform any additional booking logic, then redirect to the menu page
    navigate('/menu', { state: { canOrder: false } });  // Pass a state to disable the order button
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
                className={`p-4 ${selectedSeat === seat ? 'bg-green-500' : 'bg-gray-300'} hover:bg-gray-400`}
                onClick={() => bookSeat(seat)}
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
