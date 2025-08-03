import React, { createContext, useState, useContext } from 'react';

// Initial posts (from your Home hardcoded data, but now dynamic)
const initialPosts = [
  {
    username: "john Doe",
    time: "2 hours ago",
    message: "Just finished working on my portfolio. Super excited to share it soon!",
  },
  {
    username: "janesmith",
    time: "5 minutes ago",
    message: "Does anyone have recommendations for a good UI/UX design course?",
  },
  {
    username: "dev_guy99",
    time: "1 day ago",
    message: "Learning Firebase with React has been a game changer. Highly recommend it!",
  },
  {
    username: "techgal",
    time: "30 minutes ago",
    message: "Built a mini LinkedIn clone using React and Tailwind CSS. Feedback welcome!",
  },
  {
    username: "alex_dev",
    time: "3 hours ago",
    message: "Feeling grateful for the dev community. You all keep me motivated!",
  },
];

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  
  // Hardcoded current user (match your Profile user)
  const currentUser = {
    username: "john_doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer with a passion for building community-driven platforms. Always learning and exploring new technologies.",
  };

  const addPost = (message) => {
    const newPost = {
      username: currentUser.username,
      time: "Just now", // Simple timestamp; you can use a library like date-fns for better formatting
      message,
    };
    setPosts([newPost, ...posts]); // Add to top (newest first)
  };

  return (
    <PostContext.Provider value={{ posts, addPost, currentUser }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
