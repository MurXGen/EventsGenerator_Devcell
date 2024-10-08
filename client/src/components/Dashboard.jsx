import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Add from '../assets/add.svg';
import View from '../assets/view.svg';
import Navbar from './Navbar';


const Dashboard = () => {
  const navigate = useNavigate(); 

  const handleCreateEvents = () => {
    navigate('/create-events'); 
  };

  
  const handleExploreEvents = () => {
    navigate('/explore-events'); 
  };

  return (
    <div className='dashboard'>
      <div class="overlay"></div>
      <Navbar />
      <div className="content">
        <div className="title">
          <span>Create Events in minutes</span>
          <span>with our easy to create generator....</span>
        </div>
        <div className="navigators">
          <button onClick={handleCreateEvents}>
            <img src={Add} alt="" srcset="" />
            Create events</button>
          <button onClick={handleExploreEvents}>
          <img src={View} alt="" srcset="" />
          Explore events</button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
