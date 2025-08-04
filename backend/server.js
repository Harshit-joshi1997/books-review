import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js'; // if you have a db.js file
import {User} from './models/user.models.js'
import {Book} from './models/books.model.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
dotenv.config();

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

app.post('/books', async (req, res) => {
  const {title, author, price, published, img } = req.body;

  try {
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
      }

    const createdBookObj = await createBook({title, author, price, published, img});
    console.log('Book created:', createdBookObj);
    if (createdBookObj) {
        return res.status(200).json({ success: true, message: 'Book created successfully' });
        
    }
  } catch (error) {
    console.error('Error creating book:', error);
  }
});

const createBook = async (obj)=>{
  let response;  
  try {
       response = await Book.create(obj);
       console.log('Repo: Book created:', response);
    } catch (error) {
      console.error('Repo: Error creating book:', error);
    }
    return response;
  }

  app.get('/books', async (req, res) => {
    try{
      const {author} = req.query.author;
      const query = author ? { author } : {};
      const books = await Book.find(query);
      res.json(books);
    }catch(error){
      console.error('Error fetching books:', error);
     alert('Error fetching books')
    }
  })
      
    // Use `findOne` to get a single user document.}

// Connect DB and Start Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log('Server is running on port ',port);
  });
});
