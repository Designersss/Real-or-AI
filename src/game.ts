import { catalog } from './catalog';
import type { GameImage, ImageKind } from './catalog';

export const ROUND_COUNT = 10;
export const CATALOG_VERSION = 'v2';
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
function sampleWithCategoryMix(images: readonly GameImage[], count: number, random: () => number): GameImage[] {
  const grouped = new Map<string, GameImage[]>();
  for (const image of shuffle(images, random)) {
    const current = grouped.get(image.category) ?? [];
    current.push(image);
    grouped.set(image.category, current);
  }
  const groups = shuffle([...grouped.values()], random);
  const picked: GameImage[] = [];
  // Round-robin across shuffled categories so neither origin gets an
  // unfairly narrow set (e.g., 7 AI portraits versus 3 real landscapes).
  for (let index = 0; picked.length < count; index += 1) {
    let added = false;
    for (const group of groups) {
      const image = group[index];
      if (image) {
        picked.push(image);
        added = true;
      }
      if (picked.length === count) break;
    }
    if (!added) break;
  }
  return picked;
}

export function makeDeck(seed: string, images: readonly GameImage[] = catalog): GameImage[] {
  if (!/^[0-9a-f]{8}$/i.test(seed)) throw new Error('Invalid seed');
  const real = images.filter(image => image.kind === 'real');
  const ai = images.filter(image => image.kind === 'ai');
  const random = nextRandom(parseInt(seed, 16));
  const realCount = 3 + Math.floor(random() * 5); // 3..7 inclusive
  const aiCount = ROUND_COUNT - realCount; // 7..3 inclusive
  if (real.length < realCount || ai.length < aiCount) {
    throw new Error('The catalog does not contain enough real and AI images for this round');
  }
  const realPicked = sampleWithCategoryMix(real, realCount, random);
  const aiPicked = sampleWithCategoryMix(ai, aiCount, random);
  return shuffle([...realPicked, ...aiPicked], random);
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
  const match = /^v2-([a-f0-9]{8})$/i.exec(token);
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
