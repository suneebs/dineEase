import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Home page with buttons
import MenuPage from './pages/MenuPage';  // Menu page for accessing the cart and items
import SeatBookingPage from './pages/SeatBookingPage';  // Page for seat booking
import EditMenu from './pages/EditMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/book-seat" element={<SeatBookingPage />} />
        <Route path='/edit-menu' element={<EditMenu />}/>
      </Routes>
    </Router>
  );
}

export default App;
