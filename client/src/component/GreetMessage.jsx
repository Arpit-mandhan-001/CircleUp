import React from "react";
import { useAuth } from "../context/AuthContext";

export const GreetMessage = () => {
  const { logout, currentUser } = useAuth();

  const name = currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

  return(
    <div className="pb-5">
        <h1 className="flex text-xl font-bold text-gray-900 items-center">Welcome Back, {name}!<div>👋</div></h1>
        <div className="py-1">
        <span className="text-sm text-gray-400">Stay connected with your Professional network</span>
        </div>
    </div>
  );
};
