import { useState } from 'react';
import { Button } from '@/components/ui/button';  // Assuming you have this Button component

const SeatBookingPage = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const bookSeat = (seatNumber) => {
    setSelectedSeat(seatNumber);
    alert(`Seat ${seatNumber} booked!`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Seat</h1>
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
    </div>
  );
};

export default SeatBookingPage;
