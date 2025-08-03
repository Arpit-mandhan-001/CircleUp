import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Image, Smile, Calendar, X } from "lucide-react";

export const CreatePost = ({ onPostCreated }) => {
  const [message, setMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsPosting(true);
    try {
      const token = await currentUser.getIdToken();
      await axios.post(
        "http://localhost:5000/posts",
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("");
      setIsFocused(false);
      onPostCreated(); // Refresh posts in Home
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U"; // Fallback if no name
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0]?.toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // Get real username (from Firebase displayName or fallback to email prefix)
  const username =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

  const characterLimit = 280;
  const remainingChars = characterLimit - message.length;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="w-full bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl">
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="h-12 w-12 ring-2 ring-white shadow-md flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center">
              <span className="text-sm font-semibold">
                {getInitials(username)}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              {/* Textarea */}
              <div className="relative">
                <textarea
                  placeholder={`What's on your mind, ${
                    username.split(" ")[0]
                  }?`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  rows={isFocused ? 3 : 2}
                  className={`w-full resize-none border-0 bg-gray-50 focus:bg-gray-100 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base placeholder:text-gray-400 rounded-lg p-4 outline-none ${
                    isOverLimit ? "ring-2 ring-red-300" : ""
                  }`}
                />
                {message && (
                  <button
                    type="button"
                    onClick={() => setMessage("")}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  ></button>
                )}
              </div>

              {/* Character Counter */}
              {(isFocused || message) && (
                <div className="flex items-center justify-between ">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span
                      className={
                        remainingChars < 20
                          ? isOverLimit
                            ? "text-red-500"
                            : "text-orange-500"
                          : ""
                      }
                    >
                      {remainingChars} characters remaining
                    </span>
                  </div>
                </div>
              )}

              {/* Media Options & Post Button */}
              {isFocused && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="h-9 px-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg flex items-center gap-2"
                      disabled
                    >
                      <Image className="h-4 w-4" />
                      <span className="text-sm">Photo</span>
                    </button>
                    <button
                      type="button"
                      className="h-9 px-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg flex items-center gap-2"
                      disabled
                    >
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Event</span>
                    </button>
                    <button
                      type="button"
                      className="h-9 px-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg flex items-center gap-2"
                      disabled
                    >
                      <Smile className="h-4 w-4" />
                      <span className="text-sm">Feeling</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isFocused && (
                      <button
                        type="button"
                        onClick={() => {
                          setMessage("");
                          setIsFocused(false);
                        }}
                        className="h-9 px-4 text-gray-500 hover:text-gray-700 transition-all duration-200 rounded-lg"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={!message.trim() || isPosting || isOverLimit}
                      className="h-9 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-md disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    >
                      {isPosting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Posting...
                        </div>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Simple Post Button for unfocused state */}
              {!isFocused && message.trim() && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!message.trim() || isPosting || isOverLimit}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPosting ? "Posting..." : "Post"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
