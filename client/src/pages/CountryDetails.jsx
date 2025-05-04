// src/pages/CountryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryByCode } from '../api/countries';
import Loading from '../components/Loading';

export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchCountryByCode(code);
        setCountry(data[0]);
      } catch {
        setError('Failed to load country details.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  if (loading) return <Loading />;
  if (error)   return <p className="text-red-500 dark:text-red-400 text-center mt-6">{error}</p>;
  if (!country) return null;

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
    latlng  // [ latitude, longitude ]
  } = country;

  const nativeName = name.nativeName
    ? Object.values(name.nativeName)[0].common
    : name.common;
  const currencyList = currencies
    ? Object.values(currencies).map(c => c.name).join(', ')
    : 'N/A';
  const languageList = languages
    ? Object.values(languages).join(', ')
    : 'N/A';
  const capitalList = capital ? capital.join(', ') : 'N/A';
  const domainList = tld ? tld.join(', ') : 'N/A';

  const [lat, lng] = latlng || [0, 0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="
          bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-900 dark:text-gray-100
          px-6 py-2 rounded shadow transition
        "
      >
        ← Back
      </button>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Flag */}
        <img
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          className="w-full lg:w-1/2 h-auto rounded-lg shadow"
        />

        {/* Details + Map */}
        <div className="flex-1 space-y-6">
          {/* Info Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {name.common}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Native Name:</span>{' '}
                  {nativeName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Population:</span>{' '}
                  {population.toLocaleString()}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Region:</span>{' '}
                  {region}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Sub Region:</span>{' '}
                  {subregion}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Capital:</span>{' '}
                  {capitalList}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Top Level Domain:</span>{' '}
                  {domainList}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Currencies:</span>{' '}
                  {currencyList}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Languages:</span>{' '}
                  {languageList}
                </p>
              </div>
            </div>
            {borders && borders.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Border Countries:
                </h2>
                <div className="flex flex-wrap gap-3">
                  {borders.map(b => (
                    <button
                      key={b}
                      onClick={() => navigate(`/country/${b}`)}
                      className="
                        bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700
                        text-gray-900 dark:text-gray-100
                        px-4 py-2 rounded shadow transition
                      "
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Location
            </h2>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                title="country-map"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${lat},${lng}&z=5&output=embed`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
