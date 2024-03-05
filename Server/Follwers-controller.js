import Profile from "./Profile.js";
import User from "./User.js";

export const addfollower = async (req, res) => {
    const userId = req.params.id; // Assuming this is the ID of the user to be followed
    const followerId = req.body.followerId; // Assuming this is the ID of the follower

    try {
        // Find the user to be followed
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the user's profile
        let profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found for the user" });
        }

        // Check if the follower is already in the followers list
        if (profile.followers.includes(followerId)) {
            return res.status(400).json({ message: "User is already a follower" });
        }

        // Add the follower to the followers list
        profile.followers.push(followerId);
        profile.followerscount += 1; // Increment followers count

        // Add the user to the following list of the follower
        let followerProfile = await Profile.findOne({ user: followerId });
        if (!followerProfile) {
            followerProfile = new Profile({ user: followerId });
        }
        followerProfile.following.push(userId);
        followerProfile.followingcount += 1;

        // Save the updated profiles
        await profile.save();
        await followerProfile.save();

        return res.status(200).json({ message: "Follower added successfully" });
    } catch (error) {
        console.error("Error occurred while adding follower:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
