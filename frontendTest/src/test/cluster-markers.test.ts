import { describe, it, expect } from 'vitest';

import type { Language } from '@/data/languages';
import { clusterMarkers, getGridSize, getZoomTier, type MarkerPoint } from '@/lib/clusterMarkers';

const english: Language = {
  id: 'english',
  name: 'English',
  family: 'Germanic',
  status: 'active',
  speakers: 1500000000,
  age: '~1,400 years',
  hello: 'Hello',
  origin: 'Fixture language',
  tribes: [],
  alphabet: 'A B C',
  commonPhrases: [],
  countries: ['United Kingdom'],
  locations: [{ name: 'London', lat: 51.5074, lng: -0.1278 }],
  description: 'Fixture language',
};

const greek: Language = {
  id: 'greek',
  name: 'Greek',
  family: 'Hellenic',
  status: 'active',
  speakers: 13500000,
  age: '~3,400 years',
  hello: 'Γεια σου',
  origin: 'Fixture language',
  tribes: [],
  alphabet: 'Α Β Γ',
  commonPhrases: [],
  countries: ['Greece'],
  locations: [{ name: 'Athens', lat: 37.9838, lng: 23.7275 }],
  description: 'Fixture language',
};

describe('clusterMarkers', () => {
  it('clusters nearby markers using a grid size and tracks dominant values', () => {
    const markers: MarkerPoint[] = [
      { lat: 10.1, lng: 10.2, name: 'A', language: english },
      { lat: 10.4, lng: 10.3, name: 'B', language: english },
      { lat: -42.0, lng: 80.0, name: 'C', language: greek },
    ];

    const clusters = clusterMarkers(markers, 30);

    expect(clusters).toHaveLength(2);

    const merged = clusters.find((cluster) => cluster.count === 2);
    expect(merged).toBeDefined();
    expect(merged?.isSingle).toBe(false);
    expect(merged?.dominantStatus).toBe('active');
    expect(merged?.dominantFamily).toBe('Germanic');
  });

  it('returns expected zoom tiers and grid sizes', () => {
    expect(getZoomTier(3)).toBe('global');
    expect(getZoomTier(1.5)).toBe('medium');
    expect(getZoomTier(0.7)).toBe('close');

    expect(getGridSize('global')).toBe(30);
    expect(getGridSize('medium')).toBe(10);
    expect(getGridSize('close')).toBe(0);
  });
});
