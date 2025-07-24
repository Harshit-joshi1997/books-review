
import db from '../db/db.js';
import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await db();
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  res.status(201).json({ success: true, user: { id: user._id, email: user.email } });
}
