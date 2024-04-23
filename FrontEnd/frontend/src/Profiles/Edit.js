import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Edit({ user, onUpdate, onClose }) {
    const [updatedData, setUpdatedData] = useState({
        dob: user.dob || '',
        bio: user.bio || '',
        profileImage: null // Assuming you're allowing profile image update
    });
    const [isUpdated, setIsUpdated] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUpdatedData({ ...updatedData, profileImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('dob', updatedData.dob);
            formData.append('bio', updatedData.bio);
            if (updatedData.profileImage) {
                formData.append('profileImage', updatedData.profileImage);
            }
            await axios.put(`http://localhost:3001/updateprofile/${user}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onUpdate(updatedData);
            setIsUpdated(true); // Set success status to true
            setUpdateError(null); // Clear any previous error message
        } catch (error) {
            console.error('Error updating profile:', error);
            setIsUpdated(false); // Set success status to false
            setUpdateError('Failed to update profile'); // Set error message
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Edit Profile</h2>
                {isUpdated && <p className={updateError ? 'success' : ''}>{updateError || 'Updated'}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input type="date" name="dob" value={updatedData.dob} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Biography:</label>
                        <textarea name="bio" value={updatedData.bio} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Profile Image:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="buttons">
                        <button type="submit">Save Changes</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;
