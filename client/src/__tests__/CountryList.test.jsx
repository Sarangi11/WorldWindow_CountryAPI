// __tests__/countriesApi.test.js
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion,
  fetchCountryByCode
} from '../api/countries';

describe('countries API utilities', () => {
  const sampleData = [{ foo: 'bar' }];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchAllCountries()', () => {
    it('resolves to JSON when response.ok is true', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(sampleData)
      });

      await expect(fetchAllCountries()).resolves.toEqual(sampleData);
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    });

    it('throws when response.ok is false', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Network Error'
      });

      await expect(fetchAllCountries()).rejects.toThrow('Network Error');
    });
  });

  describe('fetchCountryByName(name)', () => {
    it('resolves to JSON when response.ok is true', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(sampleData)
      });

      await expect(fetchCountryByName('foo')).resolves.toEqual(sampleData);
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/foo');
    });

    it('returns empty array when response.ok is false', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(fetchCountryByName('foo')).resolves.toEqual([]);
    });
  });

  describe('fetchCountriesByRegion(region)', () => {
    it('resolves to JSON when response.ok is true', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(sampleData)
      });

      await expect(fetchCountriesByRegion('Europe')).resolves.toEqual(sampleData);
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/Europe');
    });

    it('returns empty array when response.ok is false', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(fetchCountriesByRegion('Nowhere')).resolves.toEqual([]);
    });
  });

  describe('fetchCountryByCode(code)', () => {
    it('resolves to JSON when response.ok is true', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(sampleData)
      });

      await expect(fetchCountryByCode('ABC')).resolves.toEqual(sampleData);
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/ABC');
    });

    it('throws when response.ok is false', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      });

      await expect(fetchCountryByCode('XYZ')).rejects.toThrow('Not Found');
    });
  });
});
