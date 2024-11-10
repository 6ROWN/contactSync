import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FaChevronDown } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const ProfileMenu = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  console.log(user);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleMenuToggle}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <button
          className={`p-0 text-gray-200 hover:text-gray-500 transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        >
          <FaChevronDown size={16} />
        </button>
      </button>

      {/* Profile Menu (Dropdown) */}
      {isMenuOpen && (
        <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2">
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-sm cursor-pointer ">
            {user?.email}
          </li>
          <hr />
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-sm cursor-pointer">
            View Profile
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-sm cursor-pointer">
            Settings
          </li>
          <li
            className="px-4 py-2 text-gray-700 bg-red-200 hover:bg-red-500 hover:text-white rounded-sm cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
