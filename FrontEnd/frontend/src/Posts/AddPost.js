import React, { useState } from 'react';
import axios from 'axios';

const AddPost = ({ user_id }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleChangeCaption = (event) => {
        setCaption(event.target.value);
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const postData = {
                user_id: user_id,
                image: image,
                caption: caption
            };
    
            const response = await axios.post(`http://localhost:3001/posts/add`, postData);
            setMessage(response.data.message);
            console.log('Post added:', response.data);
            
            setCaption('');
            setImage(null);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to add post');
        }
    };

    return (
        <div className="w-full md:w-1/2 p-4"> {/* Adjust width to fit container */}
            <div className="p-4 bg-white rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add a Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="caption" className="block mb-2">Caption:</label>
                        <input
                            type="text"
                            id="caption"
                            value={caption}
                            onChange={handleChangeCaption}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block mb-2">Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleChangeImage}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Post</button>
                </form>
                {message && <p className="mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default AddPost;
