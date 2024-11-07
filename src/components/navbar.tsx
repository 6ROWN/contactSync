// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
        ContactSync
        </Link>
        <nav className="space-x-6">
          {/* Optionally, you can add a Login link or other navigation items */}
          <Link to="/login" className="hover:text-blue-200">
            Login
          </Link>
          <Link to="/add-contact" className="hover:text-blue-200">
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;