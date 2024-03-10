import User from './User.js';
import Profile from './Profile.js';
export const getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0)
            return res.status(404).json({ message: 'No users found' });
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        console.log("Received signup request with data:", req.body); 
        let existingUser = await User.findOne({ username,email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save()
        .then((user) => {
            console.log('User created:', user);
          })
          .catch((error) => {
            console.error('Error creating user:', error);
          });

          const newProfile = new Profile({
            user: newUser._id,
            });
                await newProfile.save();
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error occurred during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found. Please sign up." });
        }

        const isPasswordValid = password === existingUser.password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        return res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

