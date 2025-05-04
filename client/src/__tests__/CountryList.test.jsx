/* eslint-env jest */
import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react';
import CountryList from '../pages/CountryList';
import * as api from '../api/countries';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider }      from '../contexts/AuthContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';

jest.mock('../api/countries');

describe('CountryList filters & map selector', () => {
  const sample = [
    { cca3: 'AAA', name: { common: 'Aland' }, population:100, region:'Europe', languages:{eng:'English'}, flags:{svg:'flag-aaa.svg'}, capital:['Foo'], latlng:[60,19] },
    { cca3: 'BBB', name: { common: 'Beta'  }, population:200, region:'Asia',   languages:{deu:'German' }, flags:{svg:'flag-bbb.svg'}, capital:['Bar'],  latlng:[34,100] }
  ];
  beforeEach(() => {
    api.fetchAllCountries.mockResolvedValue(sample);
    api.fetchCountryByName.mockResolvedValue(sample.filter(c => c.name.common.includes('A')));
    api.fetchCountriesByRegion.mockResolvedValue(sample.filter(c => c.region === 'Europe'));
  });

  it('loads & filters by region then language', async () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter><CountryList /></BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    );

    // wait for both cards (<h2 level=2>) to appear
    const headings = await screen.findAllByRole('heading', { level: 2 });
    expect(headings.map(h => h.textContent)).toEqual(expect.arrayContaining(['Aland','Beta']));

    // filter region → Asia
    fireEvent.change(screen.getByLabelText(/all regions/i), { target:{ value:'Asia' }});
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    // now only Beta remains
    const afterFilter = screen.getAllByRole('heading', { level: 2 });
    expect(afterFilter).toHaveLength(1);
    expect(afterFilter[0].textContent).toBe('Beta');

    // filter language → German
    fireEvent.change(screen.getByLabelText(/all languages/i), { target:{ value:'German' }});
    // no new loading—just assert Beta still there
    expect(screen.getByRole('heading', { level: 2, name: 'Beta' })).toBeInTheDocument();
  });

  it('selects a country for the map and shows the iframe', async () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter><CountryList /></BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    );

    // wait cards up
    await screen.findByRole('heading', { level: 2, name: 'Aland' });

    // choose Beta in the map dropdown
    fireEvent.change(screen.getByRole('combobox', { name: /select country/i }), {
      target: { value:'BBB' }
    });

    // the iframe appears with the right lat/lng
    const mapFrame = await screen.findByTitle('country-map');
    expect(mapFrame).toHaveAttribute('src', expect.stringContaining('34,100'));
  });
});
