// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load current session user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matched = users.find(u => u.username === username && u.password === password);
    if (!matched) {
      throw new Error('Invalid username or password');
    }
    const userData = { username };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.username === username)) {
      throw new Error('Username already taken');
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Auto-login new user
    const userData = { username };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
