// src/components/Header.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { LuLogOut, LuUserRound } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { GoBell } from "react-icons/go";
import { BiMessageRounded } from "react-icons/bi";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth(); // Get logout and currentUser from AuthContext

  const currentPath = location.pathname;

  const Badge = ({ children, className = "" }) => (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-medium px-2 py-1 ${className}`}
    >
      {children}
    </span>
  );

  const handleLogout = async () => {
    try {
      await logout(); // Perform actual logout via Firebase
      navigate("/sign-in"); // Redirect after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to get initials (copied from your other components for consistency)
  const getInitials = (name) => {
    if (!name) return "U"; // Fallback if no name
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0]?.toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // Get real username (from Firebase displayName or fallback to email prefix)
  const username =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

  return (
    <>
      {/* Header bar */}
      <div className="flex justify-between items-center pt-3 py-2 px-8 bg-white shadow-sm border-b border-gray-200">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3 pl-75 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">CU</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">CircleUp</h1>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center space-x-2">
          <div
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-100 py-2 px-4 rounded-xl ${
              currentPath === "/"
                ? "bg-blue-800 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            <BiHomeAlt size={18} />
            <span className="font-medium">Home</span>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-100 py-2 px-4 rounded-xl ${
              currentPath === "/profile"
                ? "bg-blue-800 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            <LuUserRound size={18} />
            <span className="font-medium">Profile</span>
          </div>
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center space-x-4">

          {/* Notification and Messages icons with badges */}
          <div className="border-r-2 text-blue-950">
          <div className="flex items-center space-x-4 pr-5">
            {/* Notification button */}
            <button className="relative p-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
              <GoBell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs bg-red-600 text-white">
                3
              </Badge>
            </button>

            {/* Messages button */}
            <button className="relative p-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
              <BiMessageRounded className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs bg-red-600 text-white">
                5
              </Badge>
            </button>
          </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {getInitials(username)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {username}
              </span>
            </div>
          </div>

          <div className="pr-25">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-200"
          >
            <LuLogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
