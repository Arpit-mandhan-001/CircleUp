import express from 'express';
import User from '../models/User.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const { username, email, bio } = req.body;
  try {
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      user = new User({ firebaseUid: req.user.uid, username, email, bio });
      await user.save();
    } else {
      user.username = username || user.username;
      user.bio = bio || user.bio;
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error saving user' });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Assuming posts are handled separately or you can populate here
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

export default router;
