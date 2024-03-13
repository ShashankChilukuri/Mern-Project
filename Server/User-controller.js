import User from './User.js';

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
    const { username, email, password, image, dob, gender } = req.body;
    try {
        console.log("Received signup request with data:", req.body); 
        let existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this username" });
        }
        
        let existingUser1 = await User.findOne({ email: email });
        if (existingUser1) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const newUser = new User({
            username,
            email,
            password,
            image,
            dob,
            gender
        });
        
        await newUser.save();
        console.log('User created:', newUser);
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error occurred during signup:", error);
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            const duplicateKey = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `Duplicate key error: ${duplicateKey} '${error.keyValue[duplicateKey]}' already exists` });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email:email });
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

