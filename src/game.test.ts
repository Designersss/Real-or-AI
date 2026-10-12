import { describe, expect, it } from 'vitest';
import { catalog } from './catalog';
import { challengeUrl, countCorrect, makeDeck, newSeed, readChallenge, ROUND_COUNT } from './game';

describe('makeDeck', () => {
  it('returns ten unique images with five from each class', () => {
    const deck = makeDeck('00000abc');
    expect(deck).toHaveLength(ROUND_COUNT);
    expect(new Set(deck.map(image => image.id)).size).toBe(ROUND_COUNT);
    expect(deck.filter(image => image.kind === 'real')).toHaveLength(5);
    expect(deck.filter(image => image.kind === 'ai')).toHaveLength(5);
  });
  it('is deterministic for shared challenge links', () => {
    expect(makeDeck('0123abcd').map(x => x.id)).toEqual(makeDeck('0123abcd').map(x => x.id));
  });
  it('rejects tampered seeds or undersized catalogs', () => {
    expect(() => makeDeck('oops')).toThrow();
    expect(() => makeDeck('00000001', catalog.filter(x => x.kind === 'real'))).toThrow();
  });
  it('generates valid seeds', () => expect(newSeed()).toMatch(/^[0-9a-f]{8}$/));
});
describe('sharing', () => {
  it('creates a reproducible and safe URL without existing parameters', () => {
    const url = challengeUrl('https://example.com/?foo=bar#hello', '01afcc11', 8);
    expect(url).toBe('https://example.com/?challenge=v1-01afcc11&from=8');
    expect(readChallenge(new URL(url).search)).toEqual({ seed: '01afcc11', score: 8 });
  });
  it('does not trust invalid challenge query data', () => {
    expect(readChallenge('?challenge=anything')).toBeNull();
    expect(readChallenge('?challenge=v1-01afcc11&from=999')).toEqual({ seed: '01afcc11', score: null });
    expect(() => challengeUrl('https://example.com', 'abcd1234', -1)).toThrow();
  });
  it('counts only correct guesses', () => {
    expect(countCorrect([{ id: '1', choice: 'ai', correct: true }, { id: '2', choice: null, correct: false }])).toBe(1);
  });
});
