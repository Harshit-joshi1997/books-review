import express from 'express';
import {User} from '../../backend/models/user.models.js';

const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err });
  }
});

export default router;
