export interface LocalStats {
  games: number;
  best: number;
}
const KEY = 'real-or-ai-stats-v1';
const empty: LocalStats = { games: 0, best: 0 };

export function readStats(): LocalStats {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    const data: unknown = JSON.parse(raw);
    if (typeof data !== 'object' || data === null) return { ...empty };
    const record = data as Record<string, unknown>;
    if (!Number.isSafeInteger(record.games) || !Number.isInteger(record.best)) return { ...empty };
    const games = record.games as number;
    const best = record.best as number;
    if (games < 0 || best < 0 || best > 10) return { ...empty };
    return { games, best };
  } catch {
    return { ...empty };
  }
}
export function saveResult(score: number): LocalStats {
  const previous = readStats();
  if (!Number.isInteger(score) || score < 0 || score > 10) return previous;
  const updated = { games: previous.games + 1, best: Math.max(previous.best, score) };
  try { localStorage.setItem(KEY, JSON.stringify(updated)); } catch { /* Private mode / blocked storage */ }
  return updated;
}
