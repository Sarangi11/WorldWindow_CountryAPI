// src/contexts/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // load when user changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`favorites_${user.username}`);
      setFavorites(stored ? JSON.parse(stored) : []);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = code => {
    let updated;
    if (favorites.includes(code)) {
      updated = favorites.filter(c => c !== code);
    } else {
      updated = [...favorites, code];
    }
    setFavorites(updated);
    if (user) {
      localStorage.setItem(
        `favorites_${user.username}`,
        JSON.stringify(updated)
      );
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
