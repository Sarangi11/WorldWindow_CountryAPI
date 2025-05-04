const BASE = 'https://restcountries.com/v3.1';

export async function fetchAllCountries() {
  const res = await fetch(`${BASE}/all`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function fetchCountryByName(name) {
  const res = await fetch(`${BASE}/name/${name}`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCountriesByRegion(region) {
  const res = await fetch(`${BASE}/region/${region}`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCountryByCode(code) {
  const res = await fetch(`${BASE}/alpha/${code}`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
