// src/pages/CountryList.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion
} from '../api/countries';
import CountryCard from '../components/CountryCard';
import Loading     from '../components/Loading';

export default function CountryList() {
  const { search } = useLocation();
  const navigate   = useNavigate();
  const q = new URLSearchParams(search).get('search') || '';

  const [countries, setCountries]       = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [region, setRegion]             = useState('');
  const [language, setLanguage]         = useState('');
  const [allLanguages, setAllLanguages] = useState([]);

  // New state for map filter
  const [selectedMapCountry, setSelectedMapCountry] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        let data;
        if (q) {
          data = await fetchCountryByName(q);
        } else if (region) {
          data = await fetchCountriesByRegion(region);
        } else {
          data = await fetchAllCountries();
        }
        setCountries(data);

        // build unique sorted language list
        const langs = new Set();
        data.forEach(c => {
          if (c.languages) {
            Object.values(c.languages).forEach(l => langs.add(l));
          }
        });
        setAllLanguages([...langs].sort());
      } catch (e) {
        console.error(e);
        setError('Failed to load countries.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [q, region]);

  // apply language filter client-side
  const displayed = language
    ? countries.filter(c =>
        c.languages && Object.values(c.languages).includes(language)
      )
    : countries;

  // get lat/lng for the map iframe
  const lat = selectedMapCountry?.latlng?.[0] ?? 0;
  const lng = selectedMapCountry?.latlng?.[1] ?? 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4">
      {/* Top controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Region */}
        <select
          aria-label="All Regions"
          value={region}
          onChange={e => {
            setRegion(e.target.value);
            setLanguage('');
            setSelectedMapCountry(null);
          }}
          className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Regions</option>
          {['Africa','Americas','Asia','Europe','Oceania'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* Language */}
        <select
          aria-label="All Languages"
          value={language}
          onChange={e => {
            setLanguage(e.target.value);
            setSelectedMapCountry(null);
          }}
          className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Languages</option>
          {allLanguages.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        {/* Country selector for map */}
        <select
          aria-label="Select Country"
          value={selectedMapCountry?.cca3 || ''}
          onChange={e => {
            const c = countries.find(c => c.cca3 === e.target.value);
            setSelectedMapCountry(c || null);
          }}
          className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Show on Map…</option>
          {displayed.map(c => (
            <option key={c.cca3} value={c.cca3}>
              {c.name.common}
            </option>
          ))}
        </select>

        {/* Show Favorites button */}
        <button
          onClick={() => navigate('/favorites')}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition"
        >
          Show Favorites
        </button>
      </div>

      {/* Map panel */}
      {selectedMapCountry && (
        <div className="mb-6 w-full h-64 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="country-map"
            width="100%"
            height="100%"
            frameBorder="0"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=5&output=embed`}
          />
        </div>
      )}

      {/* Country grid */}
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayed.map(c => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </div>
  );
}
