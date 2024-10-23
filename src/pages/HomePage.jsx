import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UploadMenu from '@/components/uploadMenu';
import EditMenu from './EditMenu';
import UpdateDocumentsButton from '@/components/UpdateExistingDoc';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Restaurant</h1>
      <Button className="bg-blue-500 hover:bg-blue-700 mb-4" onClick={() => navigate('/menu')}>
        Access Menu
      </Button>
      <Button className="bg-green-500 hover:bg-green-700 mb-4" onClick={() => navigate('/book-seat')}>
        Book Seat
      </Button>
      <Button className="bg-green-500 hover:bg-green-700 mb-4" onClick={() => navigate('/edit-menu')}>
        Edit Menu
      </Button>
      <Button className="bg-yellow-500 hover:bg-yellow-700" onClick={() => navigate('/bills')}>
        View Bills
      </Button>
    </div>
  );
};

export default HomePage;
