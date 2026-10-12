import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Copy, ExternalLink,
  ImageIcon, Link2, RotateCcw, Share2, Sparkles, Target, Trophy, X,
} from 'lucide-react';
import { catalog } from './catalog';
import type { ImageKind } from './catalog';
import {
  challengeUrl, countCorrect, gradeFor, makeDeck, newSeed, readChallenge, ROUND_COUNT,
} from './game';
import type { Guess } from './game';
import { readStats, saveResult } from './stats';

type Screen = 'start' | 'game' | 'results';
const incoming = typeof window !== 'undefined' ? readChallenge(window.location.search) : null;
const landingImages = {
  landscape: catalog.find(image => image.kind === 'real' && image.category === 'scene')!,
  animal: catalog.find(image => image.kind === 'real' && image.category === 'animal')!,
  city: catalog.find(image => image.kind === 'ai' && image.category === 'scene')!,
  portrait: catalog.find(image => image.kind === 'ai' && image.category === 'portrait')!,
};

function Logo({ icon = false }: { icon?: boolean }) {
  return (
    <a className="brand" href="/" aria-label="Real or AI home">
      {icon && <span className="brand-mark"><BrainCircuit size={22} strokeWidth={2.2}/></span>}
      <span className="brand-word">REAL <em>or</em> AI?</span>
    </a>
  );
}

function Landing({ onStart, stats }: { onStart: () => void; stats: { games: number; best: number } }) {
  return (
    <div className="site-shell landing-page">
      <div className="landing-shell">
        <header className="site-header">
          <a href="/" aria-label="Real or AI home" className="brand-mark header-logo"><BrainCircuit size={26}/></a>
          {stats.games > 0 && <span className="home-best">PERSONAL BEST: {stats.best}/10</span>}
        </header>
        <main className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot"/> THE INTERNET IS GETTING HARDER TO READ</span>
            <h1 id="hero-title">REAL<br/><span>or</span> AI?</h1>
            <h2>Can you tell what&apos;s real?</h2>
            <p>10 images. 2 choices. No clues until the end. Trust your eyes and challenge your friends.</p>
            {incoming && <div className="incoming-tag"><Sparkles size={16}/> A friend challenged you{incoming.score !== null ? ' · Their score: ' + incoming.score + '/10' : ''}</div>}
            <button type="button" onClick={onStart} className="button button-primary hero-cta">START {incoming ? 'CHALLENGE' : 'GAME'} <ArrowRight size={19}/></button>
            <div className="hero-metrics">
              <div><strong>10</strong><span>images</span></div>
              <div><strong>2</strong><span>choices</span></div>
              <div><strong>0–10</strong><span>your score</span></div>
            </div>
          </div>
          <div className="hero-collage" aria-hidden="true">
            <div className="photo-card photo-card-one"><img src={landingImages.landscape.url} alt="" loading="eager"/></div>
            <div className="photo-card photo-card-two"><img src={landingImages.animal.url} alt="" loading="eager"/></div>
            <div className="photo-card photo-card-three"><img src={landingImages.city.url} alt="" loading="lazy"/></div>
            <div className="photo-card photo-card-four"><img src={landingImages.portrait.url} alt="" loading="lazy"/></div>
            <div className="collage-glow"/>
          </div>
        </main>
      </div>
    </div>
  );
}

function Progress({ completed, current }: { completed: number; current: number }) {
  return <div className="progress-track" role="progressbar" aria-label="Game progress" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={ROUND_COUNT}>
    {Array.from({ length: ROUND_COUNT }, (_, index) => <span key={index} className={index < completed ? 'done' : index === current ? 'current' : ''}/>)}
  </div>;
}

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const handle = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header"><strong>{title}</strong><button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={19}/></button></div>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [seed, setSeed] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const submitLock = useRef(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [reload, setReload] = useState(0);
  const [stats, setStats] = useState(readStats);
  const deck = useMemo(() => seed ? makeDeck(seed) : [], [seed]);
  const image = deck[round];
  const score = countCorrect(guesses);
  const report = gradeFor(score);
  const shareLink = seed ? challengeUrl(window.location.href, seed, score) : '';

  function start(fresh = false) {
    const value = !fresh && incoming ? incoming.seed : newSeed();
    if (fresh) window.history.replaceState(null, '', window.location.pathname);
    setSeed(value);
    setRound(0);
    setGuesses([]);
    setReviewOpen(false);
    submitLock.current = false;
    setImageError(false);
    setReload(0);
    setShareOpen(false);
    setScreen('game');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  useEffect(() => {
    // The lock stops rapid double-taps from submitting twice for a round.
    submitLock.current = false;
  }, [round, screen]);

  function submitGuess(choice: ImageKind | null) {
    if (!image || submitLock.current || (choice === null ? !imageError : imageError)) return;
    submitLock.current = true;
    const guess: Guess = { id: image.id, choice, correct: choice === image.kind };
    const updated = [...guesses, guess];
    setGuesses(updated);
    if (round === ROUND_COUNT - 1) {
      setStats(saveResult(countCorrect(updated)));
      setScreen('results');
    } else {
      setRound(previous => previous + 1);
      setImageError(false);
      setReload(0);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
    } catch {
      setShareOpen(true);
    }
  }

  function shareTo(service: 'x' | 'telegram') {
    const message = 'I got ' + score + '/10 on Real or AI. Can you beat me?';
    const url = service === 'x'
      ? 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(message) + '&url=' + encodeURIComponent(shareLink)
      : 'https://t.me/share/url?url=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      {screen === 'start' && <Landing onStart={() => start()} stats={stats}/>}
      {screen === 'game' && image && (
        <div className="game-page">
          <header className="game-header"><Logo/><button className="exit-button" type="button" onClick={() => setScreen('start')}>EXIT <X size={17}/></button></header>
          <main className="game-main">
            <div className="game-top"><span className="eyebrow">LOOK CLOSELY</span><strong>{round + 1} <span>/ {ROUND_COUNT}</span></strong></div>
            <Progress completed={round} current={round}/>
            <h1 className="game-prompt">Real photograph or AI-generated?</h1>
            <div className="image-stage">
              {imageError ? (
                <div className="image-fail">
                  <ImageIcon size={38}/><strong>Image couldn&apos;t load</strong><p>Check your connection or skip this round. Skipped images count as incorrect.</p>
                  <button className="button button-secondary" type="button" onClick={() => { setImageError(false); setReload(value => value + 1); }}>Retry image <RotateCcw size={17}/></button>
                  <button type="button" className="subtle-link" onClick={() => submitGuess(null)}>Skip this image</button>
                </div>
              ) : (
                <img
                  key={image.id + '-' + reload} className="game-image"
                  src={image.url + (reload ? '?retry=' + reload : '')}
                  alt={image.alt}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="choice-grid" aria-label="Choose real or AI">
              <button type="button" className="choice-button" disabled={imageError} onClick={() => submitGuess('real')}>REAL <span>A camera caught this</span></button>
              <button type="button" className="choice-button choice-ai" disabled={imageError} onClick={() => submitGuess('ai')}>AI <span>Created by a model</span></button>
            </div>
            <p className="blind-hint">No hints. Answers are revealed after all 10 rounds.</p>
            <div className="round-footer"><span>TRUST YOUR EYES. QUESTION EVERYTHING.</span><span>ROUND {round + 1} OF {ROUND_COUNT}</span></div>
          </main>
        </div>
      )}
      {screen === 'results' && seed && (
        <div className="results-page">
          <header className="game-header"><Logo/><button className="exit-button" type="button" onClick={() => setScreen('start')}>HOME <X size={17}/></button></header>
          <main className="results-main">
            <div className="confetti" aria-hidden="true">{Array.from({ length: 24 }, (_, n) => <i key={n}/>)}</div>
            <div className="results-content">
              <span className="eyebrow">YOUR FINAL SCORE</span>
              <div className="score-number"><span>{score}</span><em> / 10</em></div>
              <h1>{report.heading}</h1><p>{report.message}</p>
              {incoming?.score !== null && incoming?.score !== undefined && seed === incoming.seed && (
                <div className="challenge-comparison">
                  <strong>Your friend: {incoming.score}/10</strong><span>{score > incoming.score ? 'You beat their score!' : score === incoming.score ? 'It is a tie!' : 'They got you this time!'}</span>
                  <small>Friend scores in shared links aren&apos;t verified.</small>
                </div>
              )}
              <button type="button" className="button button-primary result-cta" onClick={copyLink}><Share2 size={19}/> CHALLENGE A FRIEND</button>
              <div className="share-icons">
                <button type="button" aria-label="Share to X" onClick={() => shareTo('x')}>𝕏</button>
                <button type="button" aria-label="Share to Telegram" onClick={() => shareTo('telegram')}><span className="telegram-logo">➤</span></button>
                <button type="button" aria-label="Open share options" onClick={() => { setCopied(false); setShareOpen(true); }}><Link2 size={21}/></button>
              </div>
              {copied && <p className="copy-hint" role="status">Challenge link copied!</p>}
              <button type="button" className="button button-secondary play-again" onClick={() => start(true)}>Play Again <RotateCcw size={17}/></button>
              <div className="result-stat-row">
                <div><ImageIcon size={20}/><strong>10</strong><span>images</span></div>
                <div><Trophy size={20}/><strong>{score}</strong><span>correct</span></div>
                <div><Target size={20}/><strong>{score * 10}%</strong><span>accuracy</span></div>
              </div>
              <div className="result-previous">Your best: <strong>{stats.best}/10</strong> · Games played: {stats.games}</div>
              <button type="button" className="review-toggle" aria-expanded={reviewOpen} onClick={() => setReviewOpen(open => !open)}>
                {reviewOpen ? 'HIDE ANSWERS' : 'REVIEW YOUR 10 ANSWERS'} <ArrowRight size={16}/>
              </button>
              {reviewOpen && <div className="answer-review">
                {guesses.map((guess, index) => {
                  const item = deck.find(candidate => candidate.id === guess.id);
                  if (!item) return null;
                  return <article key={guess.id} className="review-item">
                    <img src={item.url} alt={item.alt} loading="lazy"/>
                    <div>
                      <span className="review-index">ROUND {index + 1}</span>
                      <strong>{item.kind === 'real' ? 'REAL PHOTO' : 'AI GENERATED'}</strong>
                      <span className={guess.correct ? 'review-correct' : 'review-wrong'}>
                        Your pick: {guess.choice === null ? 'Skipped' : guess.choice.toUpperCase()} {guess.correct ? '✓' : '✗'}
                      </span>
                      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">View source <ExternalLink size={13}/></a>
                    </div>
                  </article>;
                })}
              </div>}
            </div>
          </main>
        </div>
      )}
      {shareOpen && seed && (
        <Dialog title="Challenge a friend" onClose={() => setShareOpen(false)}>
          <div className="share-modal-content">
            <p>Send a friend this link so they can play the exact same 10 images. Can they beat {score}/10?</p>
            <label htmlFor="challenge-url">Your challenge link</label>
            <input id="challenge-url" type="text" value={shareLink} readOnly onFocus={event => event.target.select()}/>
            <button type="button" className="button button-primary" onClick={copyLink}><Copy size={17}/> {copied ? 'COPIED!' : 'COPY LINK'}</button>
            <div className="share-modal-actions"><button type="button" onClick={() => shareTo('x')}>Share to X <ArrowUpRight size={16}/></button><button type="button" onClick={() => shareTo('telegram')}>Share to Telegram <ArrowUpRight size={16}/></button></div>
          </div>
        </Dialog>
      )}
    </>
  );
}
export default App;
