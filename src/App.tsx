import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Check, Copy, ExternalLink,
  ImageIcon, Link2, Menu, RotateCcw, Share2, Sparkles, Target, Trophy, X,
} from 'lucide-react';
import { catalog } from './catalog';
import type { ImageKind } from './catalog';
import {
  challengeUrl, countCorrect, gradeFor, makeDeck, newSeed, readChallenge, ROUND_COUNT,
} from './game';
import type { Guess } from './game';
import { readStats, saveResult } from './stats';

type Screen = 'start' | 'game' | 'results';
type Choice = ImageKind | 'skipped' | null;
const incoming = typeof window !== 'undefined' ? readChallenge(window.location.search) : null;
const landingImages = {
  landscape: catalog.find(image => image.id === 'real-landscape-01')!,
  animal: catalog.find(image => image.id === 'real-animal-01')!,
  city: catalog.find(image => image.id === 'real-landscape-02')!,
  portrait: catalog.find(image => image.id === 'real-portrait-01')!,
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
  const [open, setOpen] = useState(false);
  return (
    <div className="site-shell">
      <div className="landing-shell">
        <header className="site-header">
          <a href="/" aria-label="Real or AI home" className="brand-mark header-logo"><BrainCircuit size={26}/></a>
          <nav aria-label="Main navigation" className={open ? 'header-nav is-open' : 'header-nav'}>
            <a onClick={() => setOpen(false)} href="#about">About</a>
            <a onClick={() => setOpen(false)} href="#how-it-works">How it works</a>
            <a onClick={() => setOpen(false)} href="#faq">FAQ</a>
          </nav>
          <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={23}/> : <Menu size={23}/>}
          </button>
        </header>
        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot"/> THE INTERNET IS GETTING HARDER TO READ</span>
              <h1 id="hero-title">REAL<br/><span>or</span> AI?</h1>
              <h2>Can you tell what&apos;s real?</h2>
              <p>One quick game to test your eye. 10 images, 2 choices. See how many you can get right — and challenge your friends.</p>
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
          </section>
        </main>
      </div>
      <section className="below-fold" aria-label="Game information">
        <div className="below-head" id="about"><span className="eyebrow">THE CHALLENGE</span><h2>Look closer. Trust less.</h2><p>AI imagery is getting better every day. Think you can still spot the difference?</p></div>
        <div className="how-grid" id="how-it-works">
          <article><span>01</span><ImageIcon/><h3>See the image</h3><p>Look at a photo. Take your time and inspect the details.</p></article>
          <article><span>02</span><Target/><h3>Make your call</h3><p>Decide whether it&apos;s a real photograph or AI-generated.</p></article>
          <article><span>03</span><Share2/><h3>Challenge friends</h3><p>Share your score so friends can try the exact same images.</p></article>
        </div>
        <div id="faq" className="faq-section">
          <h2>Good to know</h2>
          <p><strong>Do I need an account?</strong> Nope. You can play immediately, for free.</p>
          <p><strong>Do we use your camera?</strong> Never. We only show images from our game catalog.</p>
          <p><strong>Is this an AI detector?</strong> No. It&apos;s a visual guessing game, not a forensic tool.</p>
        </div>
        {stats.games > 0 && <p className="personal-stats">Your personal best: <strong>{stats.best}/10</strong> · {stats.games} {stats.games === 1 ? 'game' : 'games'} played on this device</p>}
      </section>
      <footer className="site-footer"><Logo/><span>Made for curious eyes · No signup required</span><a href="https://github.com/Designersss/Real-or-AI" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a></footer>
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
  const [selection, setSelection] = useState<Choice>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
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
    setSelection(null);
    setImageError(false);
    setReload(0);
    setSourceOpen(false);
    setShareOpen(false);
    setScreen('game');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function pick(choice: ImageKind) {
    if (!image || selection !== null || imageError) return;
    setSelection(choice);
    setGuesses(existing => [...existing, { id: image.id, choice, correct: image.kind === choice }]);
  }

  function skip() {
    if (!image || selection !== null || !imageError) return;
    setSelection('skipped');
    setGuesses(existing => [...existing, { id: image.id, choice: null, correct: false }]);
  }

  function next() {
    if (selection === null) return;
    setSourceOpen(false);
    if (round === ROUND_COUNT - 1) {
      setStats(saveResult(score));
      setScreen('results');
    } else {
      setRound(previous => previous + 1);
      setSelection(null);
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

  const answered = selection !== null;
  const correct = image && selection === image.kind;

  return (
    <>
      {screen === 'start' && <Landing onStart={() => start()} stats={stats}/>}
      {screen === 'game' && image && (
        <div className="game-page">
          <header className="game-header"><Logo/><button className="exit-button" type="button" onClick={() => setScreen('start')}>EXIT <X size={17}/></button></header>
          <main className="game-main">
            <div className="game-top"><span className="eyebrow">LOOK CLOSELY</span><strong>{round + 1} <span>/ {ROUND_COUNT}</span></strong></div>
            <Progress completed={round + (answered ? 1 : 0)} current={round}/>
            <h1 className="game-prompt">Real photograph or AI-generated?</h1>
            <div className="image-stage">
              {imageError ? (
                <div className="image-fail">
                  <ImageIcon size={38}/><strong>Image couldn&apos;t load</strong><p>Check your connection or skip this round. Skipped images count as incorrect.</p>
                  <button className="button button-secondary" type="button" onClick={() => { setImageError(false); setReload(value => value + 1); }}>Retry image <RotateCcw size={17}/></button>
                  <button type="button" className="subtle-link" onClick={skip}>Skip this image</button>
                </div>
              ) : (
                <img
                  key={image.id + '-' + reload} className="game-image"
                  src={image.url + (reload ? '?retry=' + reload : '')}
                  alt={image.alt}
                  onError={() => setImageError(true)}
                />
              )}
              {answered && selection !== 'skipped' && <div className="image-answer-label"><Check size={15}/> {image.kind === 'real' ? 'REAL' : 'AI GENERATED'}</div>}
            </div>
            {!answered ? (
              <div className="choice-grid" aria-label="Choose real or AI">
                <button type="button" className="choice-button" disabled={imageError} onClick={() => pick('real')}>REAL <span>A camera caught this</span></button>
                <button type="button" className="choice-button choice-ai" disabled={imageError} onClick={() => pick('ai')}>AI <span>Created by a model</span></button>
              </div>
            ) : (
              <div className="reveal-panel">
                <div className="reveal-message">
                  <span className={'reveal-icon ' + (correct ? 'correct' : 'incorrect')}>{correct ? <Check size={21}/> : <X size={21}/>}</span>
                  <div><strong>{selection === 'skipped' ? 'Round skipped' : correct ? 'Correct!' : 'Not quite!'}</strong>
                    <p>{image.kind === 'real' ? 'This is a real photograph.' : 'This image was generated by AI.'}</p>
                    <button className="source-link" type="button" onClick={() => setSourceOpen(true)}>View image source <ArrowUpRight size={14}/></button>
                  </div>
                </div>
                <button className="button button-primary next-button" onClick={next} type="button">{round === ROUND_COUNT - 1 ? 'SEE RESULTS' : 'NEXT'} <ArrowRight size={17}/></button>
              </div>
            )}
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
            </div>
          </main>
        </div>
      )}
      {sourceOpen && image && (
        <Dialog title="Image source" onClose={() => setSourceOpen(false)}>
          <img className="source-preview" alt={image.alt} src={image.url}/>
          <div className="source-details">
            <span className="source-category">{image.kind === 'ai' ? 'AI-GENERATED' : 'REAL PHOTOGRAPH'}</span>
            <p>This {image.kind === 'ai' ? 'generated image' : 'photograph'} is part of the preview image catalog.</p>
            <dl><dt>Credit</dt><dd>{image.credit}</dd><dt>Dataset</dt><dd>{image.sourceLabel}</dd><dt>Category</dt><dd>{image.category}</dd></dl>
            <a className="button button-secondary source-outbound" href={image.sourceUrl} target="_blank" rel="noopener noreferrer">View original dataset <ExternalLink size={16}/></a>
          </div>
        </Dialog>
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
