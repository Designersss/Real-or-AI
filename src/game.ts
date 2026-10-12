import { catalog } from './catalog';
import type { GameImage, ImageKind } from './catalog';

export const ROUND_COUNT = 10;
export const CATALOG_VERSION = 'v1';
export interface Guess {
  id: string;
  choice: ImageKind | null;
  correct: boolean;
}
function nextRandom(seed: number): () => number {
  let state = seed || 0x9e3779b9;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}
function shuffle<T>(items: readonly T[], next: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}
export function makeDeck(seed: string, images: readonly GameImage[] = catalog): GameImage[] {
  if (!/^[0-9a-f]{8}$/i.test(seed)) throw new Error('Invalid seed');
  const half = ROUND_COUNT / 2;
  const real = images.filter(image => image.kind === 'real');
  const ai = images.filter(image => image.kind === 'ai');
  if (real.length < half || ai.length < half) throw new Error('The game needs at least five images of each kind');
  const random = nextRandom(parseInt(seed, 16));
  return shuffle([...shuffle(real, random).slice(0, half), ...shuffle(ai, random).slice(0, half)], random);
}
export function newSeed(): string {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0]!.toString(16).padStart(8, '0');
}
export function readChallenge(search: string): { seed: string; score: number | null } | null {
  const query = new URLSearchParams(search);
  const token = query.get('challenge');
  if (!token) return null;
  const match = /^v1-([a-f0-9]{8})$/i.exec(token);
  if (!match) return null;
  const scoreText = query.get('from');
  const score = scoreText !== null && /^(10|[0-9])$/.test(scoreText) ? Number(scoreText) : null;
  return { seed: match[1]!.toLowerCase(), score };
}
export function challengeUrl(origin: string, seed: string, score: number): string {
  if (!/^[0-9a-f]{8}$/i.test(seed)) throw new Error('Invalid seed');
  if (!Number.isInteger(score) || score < 0 || score > ROUND_COUNT) throw new Error('Invalid score');
  const url = new URL(origin);
  url.search = '';
  url.hash = '';
  url.searchParams.set('challenge', CATALOG_VERSION + '-' + seed.toLowerCase());
  url.searchParams.set('from', String(score));
  return url.toString();
}
export function countCorrect(guesses: readonly Guess[]): number {
  return guesses.filter(guess => guess.correct).length;
}
export function gradeFor(score: number): { heading: string; message: string } {
  if (score === 10) return { heading: 'Perfect vision!', message: 'Not a single trick got past you. Can your friends match that?' };
  if (score >= 8) return { heading: 'Impressive eyes!', message: 'You know how to spot the details. Think your friends can beat you?' };
  if (score >= 5) return { heading: 'Not bad at all!', message: 'AI is getting convincing. Give it another shot and beat your score.' };
  return { heading: 'AI fooled you!', message: 'Those images are harder than they look. Ready for a rematch?' };
}
