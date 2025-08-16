import express from 'express';
import studentRouter from './router/studentRouter';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();
const app = express();

// Set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../views'));

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

//db connect;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI as string)
    .then(() => console.log('mongoose connected successfull'))
    .catch((err) => console.log('error from mongoose', err));

// roater setup
app.use('/', studentRouter)

// server creation
app.listen(Number(PORT), () => {
    console.log(`Server running at localhost:${PORT}`)
})