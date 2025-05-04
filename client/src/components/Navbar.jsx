// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // initialize search term
  const initialSearch = new URLSearchParams(location.search).get('search') || '';
  const [term, setTerm] = useState(initialSearch);

  // live-search debounce
  useEffect(() => {
    if (location.pathname !== '/') return;
    const handler = setTimeout(() => {
      const target = term.trim() ? `/?search=${encodeURIComponent(term.trim())}` : '/';
      navigate(target, { replace: true });
    }, 300);
    return () => clearTimeout(handler);
  }, [term, navigate, location.pathname]);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          WorldWindow
        </Link>

        {/* Search */}
        <div className="mt-4 md:mt-0 w-full md:w-1/3">
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search countries..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Controls */}
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm transition"
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>

          {/* User Greeting + Auth */}
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Hello, {user.username}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg shadow-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg shadow-sm transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
