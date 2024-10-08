import React, { useState } from 'react'
import Account from '../assets/account.svg'
import { useNavigate, Link } from 'react-router-dom';


const Navbar = () => {
  const [ismenuOpen, setismenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAccount = () => {
    navigate('/register'); // Navigate to login page
  };

  const toggleMenu = () => {
    setismenuOpen(!ismenuOpen);
  }

  const handleLogout = () => {
    navigate('/login');
  }

  return (
    <div className='navbar'>
      <div className="icon">
        <span class="material-symbols-outlined">
          hotel_class
        </span>
        <span>Celer</span>
      </div>

      <div className="hamburgerMenu" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`menu ${ismenuOpen ? "open" : ""}`}>

        <Link to="/">Home</Link>
        <Link to="/explore-events">Explore</Link>
        <button className="account" onClick={handleAccount}><img src={Account} alt="Logo" />Sign-in/up</button>

       

      </div>
    </div>
  )
}

export default Navbar