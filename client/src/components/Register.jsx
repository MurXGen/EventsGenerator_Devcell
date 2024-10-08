import React, { useState } from 'react';
import axios from 'axios';
import NavbarAcc from './NavbarAcc';
import { useNavigate } from 'react-router-dom';
import Loginicon from "../assets/login.svg"

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
            });
            alert(response.data.message);
            
            navigate('/login');
        } catch (error) {
            alert(error.response?.data.message || 'Registration failed');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <NavbarAcc/>
            <div className="loginForm">
                <div className="title">
                    <span>Register</span>
                    <span>Register & Start creating events</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className='msg'>
                        Already have an account? <button className='registerButton' onClick={handleLoginRedirect}>Login</button>
                    </p>

                    <button className="loginButton" type="submit">
                        Register
                        <img src={Loginicon} alt="" srcset="" />
                    </button>
                </form>
                
            </div>
        </div>
    );
};

export default Register;
