import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "password1") {
            setPassword1(value);
        } else if (name === "dob") {
            setDob(value);
        } else if (name === "gender") {
            setGender(value);
        }
    };

    const handleSubmit = async () => {
        if (password !== password1) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/signup', {
                username: username,
                email: email,
                password: password,
                dob: dob,
                gender: gender
            });
            const data = response.data;
            setMessage(data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                const data = error.response.data;
                setMessage(data.message);
            } else {
                setMessage("Internal server error");
            }
        }
    };

return (
        <div className='container'>
            <div className='box'>
                <h2>Signup</h2>
                <label>Username</label>
                <input type='text' name="username" placeholder='Enter Username' value={username} onChange={handleChange} />
                <label>Email</label>
                <input type='email' name="email" placeholder='Enter Email' value={email} onChange={handleChange} />
                <label>Password</label>
                <input type='password' name="password" placeholder='Enter Password' value={password} onChange={handleChange} />
                <label>Confirm Password</label>
                <input type='password' name="password1" placeholder='Confirm Password' value={password1} onChange={handleChange} />
                <label>Date of Birth</label>
                <input type='date' name="dob" value={dob} onChange={handleChange} />
                <label>Gender</label>
                <select name="gender" value={gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <p></p>
                <button type='submit' onClick={handleSubmit}>Signup</button>
                <p style={{ color: '#008000' }}>{message}</p>
                <p style={{ color: '#FF0000' }}>Already have an account? <a href="/">Login</a></p>
            </div>
        </div>
    );
}