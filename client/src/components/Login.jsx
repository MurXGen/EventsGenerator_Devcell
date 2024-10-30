import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import NavbarAcc from './NavbarAcc';
import Loginicon from "../assets/login.svg"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const validateEmail = (email) => {
        return email.endsWith('@gmail.com');
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setMessage('Email must end with @gmail.com');
            return;
        }

    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            setMessage(response.data.message);
          
            navigate('/'); // Redirect on successful login
        } catch (error) {
            setMessage(error.response?.data.message || 'Login failed');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); 
    };

    return (
        <div>
            <NavbarAcc/>
            <div className="loginForm">
                <div className="title">
                    <span>Login</span>
                    <span>Login & Start creating events</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        autoFocus
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off"
                        autoFill="off"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />

                    <p className='msg'>
                        Already have an account? <button className='registerButton' onClick={handleRegisterRedirect}>Register</button>
                    </p>

                    <button className="loginButton" type="submit">
                        Login
                        <img src={Loginicon} alt="" />
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
