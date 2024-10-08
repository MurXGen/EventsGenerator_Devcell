import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login';                
import Register from '../src/components/Register';  
import Dashboard from '../src/components/Dashboard';
import CreateEvents from '../src/components/CreateEvents';  
import ExploreEvents from '../src/components/ExploreEvents'; 
import EditEvents from '../src/components/templates/EditEvents'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-events" element={<CreateEvents />} />
                <Route path="/explore-events" element={<ExploreEvents />} />
                <Route path="/templates/edit-events" element={<EditEvents />} />
            </Routes>
        </Router>
    );
};

export default App;
