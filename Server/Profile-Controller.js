import Profile from "./Profile.js";

import User from './User.js'; 

export const createprofile=async (req,res)=>{
    const {user,image,dob,gender}=req.body;
    try{
        console.log("Received Data",req.body);
        const existingUser=await User.findOne({username:user});
        if (!existingUser) {
            return res.status(400).json({ message: "No user exists with the provided username" });
        }
        const newprofile=new Profile({
            user:existingUser._id,
            image,
            dob,
            gender
        })
        await newprofile.save()
        .then((newprofile) => {
            console.log('Profile created:', newprofile);
          })
          .catch((error) => {
            console.error('Error creating profile:', error);
          });
        return res.status(201).json({ message: "Profile created successfully", Profile: newprofile });
    } catch (error) {
        console.error("Error occurred during creating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateprofile=async (req,res)=>{
    const {dob,image,gender}=req.body;
    const prid=req.params.id;
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(prid, { dob, image,gender });

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error occurred during updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};