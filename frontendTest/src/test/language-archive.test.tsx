import { fireEvent, render, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import LanguageArchive from '@/pages/LanguageArchive';

vi.mock('@/data/languages', () => ({
  useLanguages: () => ({
    data: [
      {
        id: 'agariya',
        name: 'Agariya',
        family: 'Munda',
        status: 'endangered',
        speakers: 72000,
        age: 'Unknown',
        hello: 'Agariya',
        origin: 'Fixture',
        tribes: [],
        alphabet: 'Devanagari',
        commonPhrases: [],
        countries: ['India'],
        locations: [{ name: 'India', lat: 24.5024, lng: 82.297 }],
        description: 'Fixture',
      },
      {
        id: 'madi',
        name: 'Madi',
        family: 'Nilotic',
        status: 'vulnerable',
        speakers: 350000,
        age: 'Unknown',
        hello: 'Madi',
        origin: 'Fixture',
        tribes: [],
        alphabet: 'Latin',
        commonPhrases: [],
        countries: ['Uganda'],
        locations: [{ name: 'Uganda', lat: 2.0, lng: 32.0 }],
        description: 'Fixture',
      },
    ],
    isLoading: false,
    error: null,
  }),
}));

const renderArchive = (url: string) => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/archive" element={<LanguageArchive />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Language archive page', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('uses the query parameter as initial search filter', () => {
    renderArchive('/archive?search=agariya');

    const input = screen.getByPlaceholderText('Filter languages...');
    expect(input).toHaveValue('agariya');

    expect(screen.getByText('Agariya')).toBeInTheDocument();
    expect(screen.queryByText('Madi')).not.toBeInTheDocument();
  });

  it('shows empty state when no language matches', () => {
    renderArchive('/archive');

    fireEvent.change(screen.getByPlaceholderText('Filter languages...'), {
      target: { value: 'zzzz-not-found' },
    });

    expect(screen.getByText('No languages found. Hrmmm...')).toBeInTheDocument();
  });
});
