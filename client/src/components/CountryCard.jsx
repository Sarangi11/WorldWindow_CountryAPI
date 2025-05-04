// src/components/CountryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavouriteButton';

export default function CountryCard({ country }) {
  const navigate = useNavigate();
  const { flags, name, population, region, capital, cca3 } = country;

  return (
    <div
      onClick={() => navigate(`/country/${cca3}`)}
      className="
        relative cursor-pointer 
        bg-white dark:bg-gray-800 
        rounded-lg overflow-hidden 
        shadow transition-colors duration-300 
        hover:shadow-lg
      "
    >
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton code={cca3} />
      </div>

      <img
        src={flags.svg}
        alt={`Flag of ${name.common}`}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          {name.common}
        </h2>

        <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            Population:
          </strong>{' '}
          <span className="text-gray-700 dark:text-gray-300">
            {population.toLocaleString()}
          </span>
        </p>

        <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            Region:
          </strong>{' '}
          <span className="text-gray-700 dark:text-gray-300">
            {region}
          </span>
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            Capital:
          </strong>{' '}
          <span className="text-gray-700 dark:text-gray-300">
            {capital?.join(', ') || '—'}
          </span>
        </p>
      </div>
    </div>
  );
}
