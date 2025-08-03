import React, { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

export const Post = ({ username, time, message }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20) + 1);
  const [commentCount] = useState(Math.floor(Math.random() * 8));
  const [shareCount] = useState(Math.floor(Math.random() * 5));
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout, currentUser } = useAuth();

  const getInitials = (username) => {
    const names = username.trim().split(" ");
    if (names.length === 1) return names[0][0]?.toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const formatTimestamp = (time) => {
    // If time is already formatted, return as is
    if (typeof time === 'string' && (time.includes('m') || time.includes('h') || time.includes('d'))) {
      return time;
    }
    
    // Otherwise, try to format it
    try {
      const date = new Date(time);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m`;
      } else if (diffInHours < 24) {
        return `${diffInHours}h`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
          return `${diffInDays}d`;
        } else {
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
      }
    } catch {
      return time; // Return original if parsing fails
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="w-full bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm ring-1 ring-gray-200 rounded-xl mt-4">
      <div className="p-3">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className="h-10 w-10 ring-2 ring-white shadow-md rounded-full bg-gradient-to-br from-blue-500 to-blue-900 text-white flex items-center justify-center">
              <span className="text-sm font-semibold">{getInitials(username)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                  {username}
                </h4>
                <span className="text-xs text-gray-700">•</span>
                <span className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
                  {formatTimestamp(time)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                @{currentUser.email}
              </p>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <div 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setShowDropdown(false)}
                >
                  Save post
                </div>
                <div 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setShowDropdown(false)}
                >
                  Copy link
                </div>
                <div 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setShowDropdown(false)}
                >
                  Report post
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-gray-900">
            {message}
          </p>
        </div>

        {/* Engagement Stats */}
        {(likeCount > 0 || commentCount > 0 || shareCount > 0) && (
          <div className="flex items-center justify-between mb-1 pb-3 border-b border-gray-200">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {likeCount > 0 && (
                <span className="flex items-center space-x-1">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <ThumbsUp className="w-2.5 h-2.5 text-white font-bold" />
                    </div>
                  </div>
                  <span>{likeCount} like{likeCount !== 1 ? 's' : ''}</span>
                </span>
              )}
              {commentCount > 0 && (
                <span>{commentCount} comment{commentCount !== 1 ? 's' : ''}</span>
              )}
              {shareCount > 0 && (
                <span>{shareCount} share{shareCount !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handleLike}
              className={`h-8 px-4 transition-all duration-200 hover:bg-blue-50 rounded-lg flex items-center gap-2 ${
                isLiked 
                  ? 'text-blue-600 hover:text-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <ThumbsUp className={`h-4 w-4 transition-transform duration-200 ${
                isLiked ? 'fill-current scale-100' : ''
              }`} />
              <span className="text-sm font-medium">Like</span>
            </button>

            <button className="h-9 px-4 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Comment</span>
            </button>

            <button className="h-9 px-4 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg flex items-center gap-2">
              <Share className="h-4 w-4" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

              
      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};