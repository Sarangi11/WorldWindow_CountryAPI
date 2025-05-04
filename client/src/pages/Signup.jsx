// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const { signup }                      = useAuth();
  const navigate                        = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      signup(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-pink-50">
        <div className="w-full max-w-md p-8 bg-purple-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Choose a username"
              />
            </div>
            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Choose a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/689/230/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
          alt="Signup Illustration"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>
    </div>
  );
}
