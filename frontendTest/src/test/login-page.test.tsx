import { fireEvent, render, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import Login from '@/pages/Login';

const renderLoginFlow = () => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Home Test Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Login page', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('shows validation error for invalid credentials and clears password field', () => {
    renderLoginFlow();

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong-pass' } });
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

    expect(screen.getByText('Invalid username or password. Admin access only.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
  });

  it('navigates to home for valid credentials and sets admin session', () => {
    renderLoginFlow();

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'lingocraft2026' } });
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

    expect(screen.getByText('Home Test Page')).toBeInTheDocument();
    expect(sessionStorage.getItem('lingocraft_admin')).toBe('true');
  });
});
