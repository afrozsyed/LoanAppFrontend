import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/Auth.service';
import { authLogout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

function Navbar() {
  const [accountNumber, setAccountNumber] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("account Number::",accountNumber);
    
    if (accountNumber) {
      navigate(`/loanDetails/${accountNumber}`);
    }
  };

  const handleLogout = () => {
    authService.logout().then(()=>{
      dispatch(authLogout());
    });
    console.log('Logout clicked');
  };
  
  return (
    <header className="bg-cyan-600 fixed top-0 left-0 right-0 h-16 shadow-md z-10">
      <nav className="px-4 py-3  mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <h1 className="text-white text-xl md:text-2xl font-bold">Raghava Auto lenders</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-md">
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Search by Account Number"
            className="w-full px-4 py-2 rounded-l-lg border-none outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="bg-white text-cyan-600 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100"
          >
            Search
          </button>
        </form>
        
        {/* Logout Button */}
        <button onClick={handleLogout} className="bg-white text-cyan-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 ml-4">
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Navbar;