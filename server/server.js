// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const admin = require("firebase-admin");
// const { default: connectDB } = require("./configs/db");


// const serviceAccount = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   clientId: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // Connect to MongoDB (replace with your Atlas URI)
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Middleware to verify Firebase token
// // authenticate()

// // User Model
// const userSchema = new mongoose.Schema({
//   firebaseUid: { type: String, required: true, unique: true },
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   bio: { type: String, default: "" },
// });
// const User = mongoose.model("User", userSchema);

// // Post Model
// const postSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   message: { type: String, required: true },
//   time: { type: Date, default: Date.now },
// });
// const Post = mongoose.model("Post", postSchema);

// // Endpoints

// // Create/Update User (called after Firebase signup)
// app.post("/users", authenticate, async (req, res) => {
//   const { username, email, bio } = req.body;
//   try {
//     let user = await User.findOne({ firebaseUid: req.user.uid });
//     if (!user) {
//       user = new User({ firebaseUid: req.user.uid, username, email, bio });
//       await user.save();
//     } else {
//       user.username = username || user.username;
//       user.bio = bio || user.bio;
//       await user.save();
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Error saving user" });
//   }
// });

// // Get Current User Profile (includes posts and count)
// app.get("/profile", authenticate, async (req, res) => {
//   try {
//     const user = await User.findOne({ firebaseUid: req.user.uid });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     const posts = await Post.find({ user: user._id }).sort({ time: -1 });
//     const postCount = posts.length;
//     res.json({ ...user.toObject(), posts, postCount });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching profile" });
//   }
// });

// // Create Post
// app.post("/posts", authenticate, async (req, res) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findOne({ firebaseUid: req.user.uid });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     const post = new Post({ user: user._id, message });
//     await post.save();
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error: "Error creating post" });
//   }
// });

// // Get All Posts (populated with user info)
// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .sort({ time: -1 })
//       .populate("user", "username email bio");
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching posts" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//  "type": "module",  /*{taki import use krskae} */

import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

import connectDB from './configs/db.js';

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';

dotenv.config();

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
