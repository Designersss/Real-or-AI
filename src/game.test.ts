import { describe, expect, it } from 'vitest';
import { catalog } from './catalog';
import { challengeUrl, countCorrect, makeDeck, newSeed, readChallenge, ROUND_COUNT } from './game';

describe('makeDeck', () => {
  it('returns ten distinct images with 3–7 of each origin', () => {
    for (let n = 0; n < 150; n++) {
      const deck = makeDeck(n.toString(16).padStart(8, '0'));
      const real = deck.filter(image => image.kind === 'real').length;
      expect(deck).toHaveLength(ROUND_COUNT);
      expect(new Set(deck.map(image => image.id)).size).toBe(ROUND_COUNT);
      expect(real).toBeGreaterThanOrEqual(3);
      expect(real).toBeLessThanOrEqual(7);
      expect(ROUND_COUNT - real).toBeGreaterThanOrEqual(3);
      // The catalog covers three types of scenes. Both origin classes should
      // normally contribute multiple subjects even in short games.
      expect(new Set(deck.map(image => image.category)).size).toBe(3);
    }
  });
  it('does not keep the distribution fixed at five and five', () => {
    const proportions = new Set(Array.from({ length: 150 }, (_, n) =>
      makeDeck(n.toString(16).padStart(8, '0')).filter(image => image.kind === 'real').length,
    ));
    expect(proportions).toEqual(new Set([3, 4, 5, 6, 7]));
  });
  it('is deterministic and reproducible for shared links', () => {
    expect(makeDeck('0123abcd').map(x => x.id)).toEqual(makeDeck('0123abcd').map(x => x.id));
  });
  it('rejects invalid seeds and insufficient class counts', () => {
    expect(() => makeDeck('oops')).toThrow();
    expect(() => makeDeck('00000001', catalog.filter(x => x.kind === 'real'))).toThrow();
  });
  it('generates valid seeds', () => expect(newSeed()).toMatch(/^[0-9a-f]{8}$/));
});

describe('sharing', () => {
  it('creates a repeatable challenge link, without preserving other query params', () => {
    const url = challengeUrl('https://example.com/?foo=bar#hello', '01afcc11', 8);
    expect(url).toBe('https://example.com/?challenge=v2-01afcc11&from=8');
    expect(readChallenge(new URL(url).search)).toEqual({ seed: '01afcc11', score: 8 });
    expect(makeDeck(readChallenge(new URL(url).search)!.seed)).toEqual(makeDeck('01afcc11'));
  });
  it('rejects outdated/malformed challenges and invalid friend scores', () => {
    expect(readChallenge('?challenge=anything')).toBeNull();
    expect(readChallenge('?challenge=v1-01afcc11')).toBeNull();
    expect(readChallenge('?challenge=v2-01afcc11&from=999')).toEqual({ seed: '01afcc11', score: null });
    expect(() => challengeUrl('https://example.com', 'abcd1234', -1)).toThrow();
  });
  it('counts correct guesses without revealing results in the UI', () => {
    expect(countCorrect([{ id: '1', choice: 'ai', correct: true }, { id: '2', choice: null, correct: false }])).toBe(1);
  });
});
