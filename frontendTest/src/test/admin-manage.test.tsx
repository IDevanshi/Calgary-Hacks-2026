import { render, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import AdminManage from '@/pages/AdminManage';

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
    ],
    isLoading: false,
    error: null,
  }),
}));

const renderAdminManage = () => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/admin/manage']}>
        <Routes>
          <Route path="/admin/manage" element={<AdminManage />} />
          <Route path="/login" element={<div>Login Route</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Admin manage route', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('redirects non-admin users to login', () => {
    renderAdminManage();

    expect(screen.getByText('Login Route')).toBeInTheDocument();
  });

  it('shows admin manage page for authenticated admin', () => {
    sessionStorage.setItem('lingocraft_admin', 'true');

    renderAdminManage();

    expect(screen.getByText('Manage Languages')).toBeInTheDocument();
    expect(screen.getByText('Agariya')).toBeInTheDocument();
  });
});
