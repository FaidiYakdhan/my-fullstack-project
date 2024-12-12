import connectToDatabase from '../../lib/db';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const users = await User.find();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
