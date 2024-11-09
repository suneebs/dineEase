import { useNavigate } from 'react-router-dom';
import DLogo from "@/assets/test.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-white p-6">
      {/* Logo Section */}
      <div className="flex justify-center items-center h-48 w-48">
        <img src={DLogo} alt="LOGO" className="h-full w-full object-contain" />
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        <div
          onClick={() => navigate('/menu')}
          className="cursor-pointer bg-transparent hover:bg-transparent text-center py-4 px-8 rounded-xl border-2 border-transparent hover:border-blue-500 shadow-lg transition duration-300 transform hover:scale-105"
        >
          <p className="text-xl font-semibold text-gray-200 font-playfair">Access Menu</p>
        </div>

        <div
          onClick={() => navigate('/book-seat')}
          className="cursor-pointer bg-transparent hover:bg-transparent text-center py-4 px-8 rounded-xl border-2 border-transparent hover:border-green-500 shadow-lg transition duration-300 transform hover:scale-105"
        >
          <p className="text-xl font-semibold text-gray-200 font-playfair">Book Seat</p>
        </div>

        <div
          onClick={() => navigate('/edit-menu')}
          className="cursor-pointer bg-transparent hover:bg-transparent text-center py-4 px-8 rounded-xl border-2 border-transparent hover:border-purple-500 shadow-lg transition duration-300 transform hover:scale-105"
        >
          <p className="text-xl font-semibold text-gray-200 font-playfair">Edit Menu</p>
        </div>

        <div
          onClick={() => navigate('/bills')}
          className="cursor-pointer bg-transparent hover:bg-transparent text-center py-4 px-8 rounded-xl border-2 border-transparent hover:border-yellow-500 shadow-lg transition duration-300 transform hover:scale-105"
        >
          <p className="text-xl font-semibold text-gray-200 font-playfair">View Bills</p>
        </div>

        <div
          onClick={() => navigate('/table-orders')}
          className="cursor-pointer bg-transparent hover:bg-transparent text-center py-4 px-8 rounded-xl border-2 border-transparent hover:border-indigo-500 shadow-lg transition duration-300 transform hover:scale-105"
        >
          <p className="text-xl font-semibold text-gray-200 font-playfair">View Table Orders</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
