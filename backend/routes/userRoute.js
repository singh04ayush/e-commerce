import express from 'express';
import { loginUser, adminLogin, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// Profile routes
userRouter.post('/profile', auth, getUserProfile);
userRouter.post('/profile/update', auth, updateUserProfile);


export default userRouter;