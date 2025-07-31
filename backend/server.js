import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // if you're using it
import connectDB from './db/db.js'; // if you have a db.js file

const app = express();

// ✅ CORS Middleware Setup
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Sample sign-up route
app.post('/sign-up', async (req, res) => {
  const { name, email, password } = req.body;

  // (your DB logic here)

  res.status(201).json({ message: 'User created successfully' });
});

// Connect DB and Start Server
connectDB().then(() => {
  app.listen(8000, () => {
    console.log('🚀 Server running at http://localhost:8000');
  });
});
