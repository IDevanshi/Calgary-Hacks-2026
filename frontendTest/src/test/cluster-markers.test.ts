import { describe, it, expect } from 'vitest';

import { languages } from '@/data/languages';
import { clusterMarkers, getGridSize, getZoomTier, type MarkerPoint } from '@/lib/clusterMarkers';

const english = languages.find((lang) => lang.id === 'english');
const greek = languages.find((lang) => lang.id === 'greek');

if (!english || !greek) {
  throw new Error('Required fixture languages are missing.');
}

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
