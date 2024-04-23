import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from './profilr.jpg'; 
import EditProfilePopup from './Edit.js'; 
import PPost from '../Posts/PPost.js';
import './Profile.css'; 
import { useParams } from 'react-router-dom';
import '../Posts/APostpage.css';
import Sidebar from './SideNavBar.js';

function Profile() {
    const {user_id } = useParams();
    
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(defaultImage);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getprofile/${user_id}`);
                setUser(response.data.user);
                setImage(response.data.user?.image || defaultImage);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const fetchFollowersAndFollowing = async () => {
            try {
                const followersResponse = await axios.get(`http://localhost:3001/getfollowers/${user_id}`);
                setFollowers(followersResponse.data.followers);

                const followingResponse = await axios.get(`http://localhost:3001/getfollowing/${user_id}`);
                setFollowing(followingResponse.data.following);
            } catch (error) {
                console.error('Error fetching followers/following:', error);
            }
        };

        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/posts/getbyuserid/${user_id}`);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUser();
        fetchFollowersAndFollowing();
        fetchUserPosts();
    }, [user_id]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
    };

    const handleProfileUpdate = (updatedData) => {
        setUser((prevUser) => ({
            ...prevUser,
            dob: updatedData.dob,
            bio: updatedData.bio
            // You might also want to update other user details if needed
        }));
        setIsEditing(false);
    };

    return (
        <div className="container">
        <div className="sidebar-container">
            <Sidebar user_id={user_id} />
        </div>
        <div className="add-post-container">
        <div className="profile-container">
            <h1 className="header">User Profile</h1>
            <div className='Profile-container'>
                <div className="profile">
                    <div className="profile-image">
                        <img src={image} alt="User" />
                    </div>
                    <div className="profile-details">
                        {user && (
                            <>
                                <h2>{user.username}</h2>
                                <p>Email: {user.email}</p>
                                <p>Date of Birth: {user.dob}</p>
                                <p>Gender: {user.gender}</p>
                            </>
                        )}
                        <button className="edit-button" onClick={handleEditClick}>Edit</button>
                    </div>
                </div>
            </div>

            <div className="follow-container">
                <div className="followers">
                    <h3>Followers: {followers.length}</h3>
                    <ul>
                        {followers.map((follower, index) => (
                            <li key={index}>{follower}</li>
                        ))}
                    </ul>
                </div>
                <div className="following">
                    <h3>Following: {following.length}</h3>
                    <ul>
                        {following.map((followedUser, index) => (
                            <li key={index}>{followedUser}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="posts-container">
                <h1>My Posts</h1>
                <div className="post-grid">
                    {posts.map(post => (
                        <PPost key={post._id} post={post} />
                    ))}
                </div>
            </div>

            {isEditing && (
                <EditProfilePopup
                    user={user_id}
                    onUpdate={handleProfileUpdate}
                    onClose={handleCloseEdit}
                />
            )}
        </div>
        </div>
        </div>
    );
}

export default Profile;
