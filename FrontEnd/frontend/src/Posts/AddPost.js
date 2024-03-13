import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [message,setmessage]=useState(" ");
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
            const response = await axios.post(`http://localhost:3001/posts/add`, {
                user: 'Koushik', 
                image,
                caption,
            });
            setmessage(response.data.message);
            console.log('Post added:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add a Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="caption">Caption:</label>
                    <input
                        type="text"
                        id="caption"
                        value={caption}
                        onChange={handleChangeCaption}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleChangeImage}
                        required
                    />
                </div>
                <button type="submit">Add Post</button>
            </form>
            {message}
        </div>
    );
};

export default AddPost;
