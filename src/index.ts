import express, { Express } from 'express';
import studentRouter from './router/studentRouter';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();
const app: Express = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

const PORT: number = parseInt(process.env.PORT || '3000', 10);

// DB connect
const MONGO_URI: string = process.env.MONGO_URI || '';
mongoose.connect(MONGO_URI)
    .then(() => console.log('Mongoose connected successfully'))
    .catch((err) => console.error('Mongoose connection error:', err));

// Router setup
app.use('/', studentRouter);

// Server creation
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});