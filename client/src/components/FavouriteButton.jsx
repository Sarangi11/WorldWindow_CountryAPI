// src/components/FavoriteButton.jsx
import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoriteButton({ code }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(code);

  return (
    <button
      onClick={e => {
        e.stopPropagation();
        toggleFavorite(code);
      }}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      className="text-2xl"
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  );
}
