import React, { useState } from 'react';
import axios from 'axios';

export const CreateProfile = ({ username }) => {
    
    const [image, setImage] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/profiles', {
                user: username,
                image,
                dob,
                gender
            });
            console.log('Profile created:', response.data);
            // Optionally, you can navigate to another page or show a success message
        } catch (error) {
            console.error('Error creating profile:', error.message);
            // Optionally, you can show an error message to the user
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Image</label>
                <input type='text' placeholder='Enter Image URL' value={image} onChange={(e) => setImage(e.target.value)} />
                <label>Date of Birth</label>
                <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} />
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button type='submit'>Create Profile</button>
            </form>
        </div>
    );
};
