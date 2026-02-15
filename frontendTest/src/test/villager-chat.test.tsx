import { fireEvent, render, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import VillagerChat from '@/components/VillagerChat';

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

const renderVillagerChat = () => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/']}>
        <VillagerChat />
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Villager chat', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('validates required fields when submitting a suggestion', () => {
    renderVillagerChat();

    fireEvent.click(screen.getByTitle('Talk to the Villager'));
    fireEvent.click(screen.getByRole('button', { name: '📜 Suggest a missing language' }));
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Please tell us about the language.')).toBeInTheDocument();
  });

  it('accepts a valid suggestion form submission', () => {
    renderVillagerChat();

    fireEvent.click(screen.getByTitle('Talk to the Villager'));
    fireEvent.click(screen.getByRole('button', { name: '📜 Suggest a missing language' }));

    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(
      screen.getByPlaceholderText('Tell us about the language (name, region, any info you have)...'),
      { target: { value: 'Please add Dene languages with northern community references.' } }
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('Thank you for your submission! Our team will review it and get back to you via email.')
    ).toBeInTheDocument();
  });
});
