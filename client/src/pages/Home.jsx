import { useEffect, useState } from "react";
import { CreatePost } from "../component/CreatePost"; // Adjust path
import { Post } from "../component/Post";
import axios from "axios";
import { GreetMessage } from "../component/GreetMessage";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { logout, currentUser } = useAuth();

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial load
  }, []);

  return (
    <div className="w-200 mx-40 flex gap-6">
      {/* Main content: greet message, create post, posts */}
      <div className="flex-1">
        <GreetMessage />
        <CreatePost onPostCreated={() => fetchPosts()} />{" "}
        {/* Pass a refresh function */}
        <div className="my-7">
          {posts.map((post) => (
            <Post
              key={post._id}
              username={post.user.username}
              time={new Date(post.time).toLocaleString()} // Format date
              message={post.message}
            />
          ))}
        </div>
      </div>

      {/* Sidebar: hidden on small screens */}
      <div className="hidden lg:block space-y-6 w-50">
        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm rounded-xl">
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              {/* Placeholder for TrendingUp icon */}
                            <svg className="h-4 w-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 8" />
              </svg>
              Your Activity
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Posts this week</span>
                <span className="font-semibold text-blue-700">
                  {currentUser.length === 0 ? 7 : 8}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Profile views</span>
                <span className="font-semibold text-blue-700">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Connections</span>
                <span className="font-semibold text-blue-700">156</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-lg">
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Trending Topics
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-gray-900">#ReactJS</p>
                <p className="text-xs text-gray-600">2.3k posts</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-gray-900">
                  #WebDevelopment
                </p>
                <p className="text-xs text-gray-600">1.8k posts</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-gray-900">#RemoteWork</p>
                <p className="text-xs text-gray-600">1.2k posts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-lg">
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              {/* Placeholder for Calendar icon */}
              <svg
                className="h-4 w-4 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Upcoming Events
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-gray-900">
                  Tech Meetup 2024
                </p>
                <p className="text-xs text-gray-600">Tomorrow, 6:00 PM</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-gray-900">
                  Design Workshop
                </p>
                <p className="text-xs text-gray-600">Dec 15, 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
