import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const { message } = req.body;
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const post = new Post({ user: user._id, message });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ time: -1 })
      .populate('user', 'username email bio');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

export default router;
