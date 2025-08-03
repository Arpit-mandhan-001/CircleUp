import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MapPin, Calendar, Link, MoreHorizontal } from "lucide-react";
import { TbPhotoEdit } from "react-icons/tb";

export const MyProfile = ({ username, email, bio }) => {
  const getInitials = (username) => {
    const names = username.trim().split(" ");
    if (names.length === 1) return names[0][0]?.toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
        {/* Cover Photo */}
        <div className="h-40 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-300 relative">
          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="h-30 w-30 rounded-full bg-gradient-to-br from-blue-500 to-blue-900 text-white flex items-center justify-center text-center overflow-hidden border-4 border-white shadow-lg">
                <span className="text-3xl font-bold leading-none">
                  {getInitials(username)}
                </span>
              </div>
              {/* Camera Icon */}
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                <TbPhotoEdit className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-8 px-8 h-60">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full border border-blue-200">
                  Pro
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {bio ||
                  "Professional enthusiast passionate about innovation and connecting with like-minded individuals."}
              </p>

              {/* Location and Join Date */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>New Delhi, India</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined August 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href="https://drive.google.com/file/d/1kpdvvc62g_QAbhLLaTSk-EvD7lb9coxH/view?usp=drive_link"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    portfolio.dev
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 ml-6">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-300 transition-colors font-medium text-gray-700">
                <MdOutlineModeEdit className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-8 border-t border-gray-200 justify-between">
        <div className="text-center p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex-1">
          <div className="text-2xl font-bold text-blue-600">156</div>
          <div className="text-sm font-medium text-gray-500">Connections</div>
        </div>
        <div className="text-center p-6 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex-1">
          <div className="text-2xl font-bold text-green-500">89</div>
          <div className="text-sm font-medium text-gray-500">Posts</div>
        </div>
        <div className="text-center p-6 bg-purple-200 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex-1">
          <div className="text-2xl font-bold text-purple-500">1.2k</div>
          <div className="text-sm font-medium text-gray-500">Followers</div>
        </div>
        <div className="text-center p-6 bg-orange-100 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex-1">
          <div className="text-2xl font-bold text-orange-500">890</div>
          <div className="text-sm font-medium text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
};
