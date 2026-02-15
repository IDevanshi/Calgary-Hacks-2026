import { fireEvent, render, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const AuthProbe = () => {
  const { isAdmin, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="admin-state">{isAdmin ? 'admin' : 'guest'}</span>
      <button onClick={() => login('bad', 'creds')}>bad-login</button>
      <button onClick={() => login('admin', 'lingocraft2026')}>good-login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('logs in and out while persisting admin state in session storage', () => {
    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    );

    expect(screen.getByTestId('admin-state')).toHaveTextContent('guest');

    fireEvent.click(screen.getByRole('button', { name: 'bad-login' }));
    expect(screen.getByTestId('admin-state')).toHaveTextContent('guest');
    expect(sessionStorage.getItem('lingocraft_admin')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'good-login' }));
    expect(screen.getByTestId('admin-state')).toHaveTextContent('admin');
    expect(sessionStorage.getItem('lingocraft_admin')).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: 'logout' }));
    expect(screen.getByTestId('admin-state')).toHaveTextContent('guest');
    expect(sessionStorage.getItem('lingocraft_admin')).toBeNull();
  });
});
