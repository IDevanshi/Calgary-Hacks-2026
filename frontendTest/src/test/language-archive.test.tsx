import { fireEvent, render, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import LanguageArchive from '@/pages/LanguageArchive';

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
    renderArchive('/archive?search=greek');

    const input = screen.getByPlaceholderText('Filter languages...');
    expect(input).toHaveValue('greek');

    expect(screen.getByText('Greek')).toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  it('shows empty state when no language matches', () => {
    renderArchive('/archive');

    fireEvent.change(screen.getByPlaceholderText('Filter languages...'), {
      target: { value: 'zzzz-not-found' },
    });

    expect(screen.getByText('No languages found. Hrmmm...')).toBeInTheDocument();
  });
});
