import Profile from "./Profile.js";
import User from './User.js';

export const findprofile = async (req, res) => {
    const { username } = req.body;
    try {
        // Use findOne instead of find to get a single profile
        const profile = await Profile.findOne({ user: username });
        
        // Check if profile is found
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        else
        return res.json({ profile });
    } catch (err) {
        console.error("Error occurred while finding profile:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateprofile = async (req, res) => {
    const { username, dob, image, gender } = req.body;
    
    try {
        // Find the user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the profile by user's ObjectId and update it
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: user._id }, // Filter criteria
            { dob, image, gender }, // Update data
            { new: true } // Return the updated document
        );
            
        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Update the userProfile field in the User model to true
        await User.updateOne(
            { username }, // Filter criteria
            { userProfile: true } // Update data
        );

        return res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
        console.error("Error occurred during updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

