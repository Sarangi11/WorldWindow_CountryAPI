import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4">
      <nav className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-bold">Home</Link>
        </nav>
      <button
        onClick={toggleTheme}
        className="px-3 py-1 bg-blue-500 text-white rounded focus:outline-none"
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </header>)
}