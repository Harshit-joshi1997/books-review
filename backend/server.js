import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js'; // if you have a db.js file
import {User} from './models/user.models.js'
import bodyParser from 'body-parser'


const app = express();
const port = 8000;

// ✅ CORS Middleware Setup
app.use(cors()); 



// Middleware to parse JSON
app.use(bodyParser.json());

const createUser = async (obj)=>{
  let response;  
  try {
       response = await User.create(obj);
       console.log('Repo: User created:', response);
    } catch (error) {
      console.error('Repo: Error creating user:', error);
    }

    return response;
}

// Sample sign-up route
app.post('/sign-up', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
      }

    const createdUserObj = await createUser({username, email, password});
    console.log('User created:', createdUserObj);
    if (createdUserObj) {
      // It's good practice to send a consistent and secure response.
      return res.status(201).json({ success: true, message: 'User created successfully' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use `findOne` to get a single user document.
    const user = await User.findOne({ email, password });

    // If no user is found, send an "unauthorized" error.
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // If the user is found, send a success response.
    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



// Connect DB and Start Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log('Server is running on port ',port);
  });
});
