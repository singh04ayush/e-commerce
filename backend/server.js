import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send("API working")
})

app.listen(port, ()=> {
    console.log("server started on PORT: " + port);
})