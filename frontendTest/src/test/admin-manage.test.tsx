import { render, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import AdminManage from '@/pages/AdminManage';

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
    sessionStorage.setItem('linguacraft_admin', 'true');

    renderAdminManage();

    expect(screen.getByText('⚙️ Manage Languages')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });
});
