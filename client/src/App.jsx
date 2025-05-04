// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import CountryList from './pages/CountryList';
import CountryDetails from './pages/CountryDetails';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Signup from './pages/SignUp';
import Layout from './components/Layout';

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
     <Layout>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" replace />}
          />
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route
            path="/favorites"
            element={
              user ? <Favorites /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
      </Layout>
    </BrowserRouter>
  );
}
