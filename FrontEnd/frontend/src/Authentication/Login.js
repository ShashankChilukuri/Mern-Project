import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setAuthenticated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password
            });
            
            const data = response.data;
            setMessage(data.message);
            let name = response.data.username;
            let id = response.data.user_id;
            setAuthenticated(true); 
            navigate(`/home/${name}/${id}`);
        } catch (error) {
            if (error.response && error.response.data) {
                const data = error.response.data;
                setMessage(data.message);
            } else {
                setMessage("Internal server error");
            }
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className='container'>
            <div className='box'>
                <label>Email</label>
                <input type='email' placeholder='Enter Email' value={email} onChange={handleEmailChange} />
                <label>Password</label>
                <input type='password' placeholder='Enter Password' value={password} onChange={handlePasswordChange} />
                <button type='submit' onClick={handleSubmit}>Login</button>
                <p style={{ color:'#008000' }}>{message}</p> 
                <p style={{ color: '#FF0000' }}>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    );
}

export default Login;
