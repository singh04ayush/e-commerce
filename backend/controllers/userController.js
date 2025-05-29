import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for User Login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}






//Route for user Regsitration
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        console.log(name , email, password);

        // Checking user already exist or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exist" });
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a vaild email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (at least 8 char)" });
        }


        //hashing user password
        const salt = await bcrypt.genSalt(12);
        const hasedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hasedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




// Route for admin Login
const adminLogin = async (req, res) => {
    try {
        
        const { email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token});
        }
        else{
            res.json({success:false, message:"Invalid credentials"});
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




// Get user profile information
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        // Return user data without password
        const userData = {
            name: user.name,
            email: user.email,
            billingInfo: user.billingInfo || {}
        };
        
        res.json({ success: true, user: userData });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user profile information
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, billingInfo } = req.body;
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        // Update user data
        if (name) user.name = name;
        if (billingInfo) user.billingInfo = billingInfo;
        
        await user.save();
        
        res.json({ 
            success: true, 
            message: "Profile updated successfully",
            user: {
                name: user.name,
                email: user.email,
                billingInfo: user.billingInfo
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile }