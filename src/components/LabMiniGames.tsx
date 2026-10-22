import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Cat,
  Cloud,
  Coffee,
  Heart,
  Moon,
  Music,
  RotateCcw,
  Sparkles,
  Star,
  Wand2,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  marginBottom: '16px',
};

const statPill: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 10px',
  borderRadius: 'var(--radius-full)',
  border: '1.5px solid var(--color-taupe-grey)',
  backgroundColor: 'var(--color-soft-blush)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  fontWeight: 700,
};

const tapBtn: React.CSSProperties = {
  minHeight: '44px',
  touchAction: 'manipulation',
};

// ==========================================
// MEMORY MATCH
// ==========================================
const MEMORY_ICONS = [Sparkles, Heart, Star, Cat, Cloud, Music, Coffee, Moon];

type MemoryCard = {
  id: number;
  pair: number;
  Icon: typeof Sparkles;
};

function shuffleCards(): MemoryCard[] {
  const deck: MemoryCard[] = MEMORY_ICONS.flatMap((Icon, pair) => [
    { id: pair * 2, pair, Icon },
    { id: pair * 2 + 1, pair, Icon },
  ]);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const MemoryMatch: React.FC = () => {
  const [deck, setDeck] = useState<MemoryCard[]>(() => shuffleCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const lockRef = useRef(false);

  const won = matched.length === MEMORY_ICONS.length;

  const reset = () => {
    soundEngine.playClick(420, 0.05);
    lockRef.current = false;
    setDeck(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const flip = (index: number) => {
    if (lockRef.current || won) return;
    if (flipped.includes(index) || matched.includes(deck[index].pair)) return;

    soundEngine.playClick(680 + (index % 8) * 30, 0.03);
    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (deck[a].pair === deck[b].pair) {
        soundEngine.playSparkle();
        setMatched((prev) => [...prev, deck[a].pair]);
        setFlipped([]);
      } else {
        lockRef.current = true;
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 720);
      }
    }
  };

  return (
    <div>
      <div style={cardStyle}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', marginBottom: '4px' }}>Memory Match</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-grey)' }}>
            Flip two cards at a time. Match all eight pairs of retro icons.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={statPill}>Moves: {moves}</span>
          <span style={statPill}>Pairs: {matched.length}/{MEMORY_ICONS.length}</span>
          <button onClick={reset} className="retro-btn retro-btn-secondary" style={{ ...tapBtn, padding: '6px 12px', fontSize: '0.8rem' }}>
            <RotateCcw size={14} /> Shuffle
          </button>
        </div>
      </div>

      {won && (
        <div style={{
          textAlign: 'center',
          marginBottom: '14px',
          padding: '10px 12px',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--color-taupe-grey)',
          backgroundColor: 'var(--color-soft-blush)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
        }}>
          You matched every pair in {moves} moves. Sparkle combo complete ✦
        </div>
      )}

      <div className="lab-memory-grid">
        {deck.map((card, index) => {
          const isOpen = flipped.includes(index) || matched.includes(card.pair);
          const Icon = card.Icon;
          return (
            <button
              key={`${card.id}-${index}`}
              className="lab-memory-card"
              onClick={() => flip(index)}
              aria-label={isOpen ? `Matched icon pair ${card.pair + 1}` : 'Hidden memory card'}
              style={{
                backgroundColor: isOpen ? 'var(--color-old-rose)' : 'var(--color-soft-blush)',
                color: isOpen ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                transform: isOpen ? 'rotateY(0deg)' : 'none',
              }}
            >
              {isOpen ? <Icon size={26} /> : <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>?</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// STAR CATCHER
// ==========================================
type FallingStar = { id: number; x: number; y: number; speed: number; size: number };

export const StarCatcher: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [stars, setStars] = useState<FallingStar[]>([]);
  const nextId = useRef(1);
  const playRef = useRef(false);

  useEffect(() => {
    playRef.current = playing;
  }, [playing]);

  const start = () => {
    soundEngine.playSparkle();
    setScore(0);
    setStars([]);
    setTimeLeft(20);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    const spawn = window.setInterval(() => {
      setStars((prev) => [
        ...prev.slice(-10),
        {
          id: nextId.current++,
          x: 8 + Math.random() * 84,
          y: -8,
          speed: 1.4 + Math.random() * 1.8,
          size: 36 + Math.random() * 14,
        },
      ]);
    }, 480);
    const tick = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPlaying(false);
          soundEngine.playChime(392, 0.4);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    const move = window.setInterval(() => {
      if (!playRef.current) return;
      setStars((prev) => prev.map((s) => ({ ...s, y: s.y + s.speed })).filter((s) => s.y < 110));
    }, 50);
    return () => {
      window.clearInterval(spawn);
      window.clearInterval(tick);
      window.clearInterval(move);
    };
  }, [playing]);

  useEffect(() => {
    if (!playing && score > best) setBest(score);
  }, [playing, score, best]);

  const catchStar = (id: number) => {
    if (!playing) return;
    soundEngine.playClick(880, 0.03);
    setStars((prev) => prev.filter((s) => s.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div>
      <div style={cardStyle}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', marginBottom: '4px' }}>Star Catcher</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-grey)' }}>
            Tap falling stars before they drift off the pad. Twenty seconds, go!
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={statPill}>Score: {score}</span>
          <span style={statPill}>Best: {best}</span>
          <span style={statPill}>Time: {timeLeft}s</span>
          <button onClick={start} className="retro-btn" style={{ ...tapBtn, padding: '6px 14px', fontSize: '0.8rem' }}>
            <Star size={14} /> {playing ? 'Restart' : 'Play'}
          </button>
        </div>
      </div>

      <div className="lab-star-stage" aria-label="Star catching playfield">
        {!playing && score === 0 && (
          <div className="lab-star-empty">Tap Play, then catch the sparkles</div>
        )}
        {!playing && score > 0 && (
          <div className="lab-star-empty">Caught {score} stars. Play again?</div>
        )}
        {stars.map((star) => (
          <button
            key={star.id}
            className="lab-falling-star"
            onPointerDown={(e) => {
              e.preventDefault();
              catchStar(star.id);
            }}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            aria-label="Catch star"
          >
            ✦
          </button>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// COSMIC ORACLE
// ==========================================
const SIGNS = [
  { name: 'Aries', glyph: '♈' },
  { name: 'Taurus', glyph: '♉' },
  { name: 'Gemini', glyph: '♊' },
  { name: 'Cancer', glyph: '♋' },
  { name: 'Leo', glyph: '♌' },
  { name: 'Virgo', glyph: '♍' },
  { name: 'Libra', glyph: '♎' },
  { name: 'Scorpio', glyph: '♏' },
  { name: 'Sagittarius', glyph: '♐' },
  { name: 'Capricorn', glyph: '♑' },
  { name: 'Aquarius', glyph: '♒' },
  { name: 'Pisces', glyph: '♓' },
];

const READINGS = [
  'A tiny idea you almost dismissed wants a prototype tonight. Give it 20 minutes.',
  'Someone will notice the extra care you put into a detail nobody asked for.',
  'Your next bug is actually a plot twist. Follow it instead of fighting it.',
  'Rest is a feature, not a crash. Close one tab and the rest will behave.',
  'A pastel coincidence shows up in your day. Treat it as a save point.',
  'Ship the messy version. Charm beats polish when the idea is still warm.',
  'Your curiosity is the main quest. Side quests can wait until after lunch.',
  'A soft yes beats a perfect maybe. Send the message you already drafted.',
  'The tool you already know is enough for today. Invent later, finish now.',
  'A cat-shaped thought will solve a stubborn layout. Trust the meow.',
  'Luck is queued behind one more commit. Keep the streak gentle, not frantic.',
  'You are allowed to make something that exists only because it made you smile.',
];

export const CosmicOracle: React.FC = () => {
  const [sign, setSign] = useState<(typeof SIGNS)[number] | null>(null);
  const [reading, setReading] = useState('Pick a sign (or surprise me) for a tiny cosmic pep talk.');
  const [spinning, setSpinning] = useState(false);

  const draw = useCallback((chosen?: (typeof SIGNS)[number]) => {
    const picked = chosen ?? SIGNS[Math.floor(Math.random() * SIGNS.length)];
    setSpinning(true);
    soundEngine.playChime(523.25, 0.35);
    window.setTimeout(() => {
      setSign(picked);
      setReading(READINGS[Math.floor(Math.random() * READINGS.length)]);
      setSpinning(false);
      soundEngine.playSparkle();
    }, 420);
  }, []);

  return (
    <div>
      <div style={cardStyle}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', marginBottom: '4px' }}>Cosmic Oracle</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-grey)' }}>
            A playful cousin of the Daily Horoscope Bot. Tap a sign for a pocket-sized reading.
          </p>
        </div>
        <button
          onClick={() => draw()}
          className="retro-btn"
          style={{ ...tapBtn, padding: '6px 14px', fontSize: '0.8rem' }}
        >
          <Wand2 size={14} /> Surprise me
        </button>
      </div>

      <div className="lab-oracle-grid">
        {SIGNS.map((item) => {
          const active = sign?.name === item.name;
          return (
            <button
              key={item.name}
              className="lab-oracle-sign"
              onClick={() => draw(item)}
              style={{
                backgroundColor: active ? 'var(--color-old-rose)' : 'var(--color-soft-blush)',
                color: active ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
              }}
            >
              <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{item.glyph}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className={`lab-oracle-card${spinning ? ' is-spinning' : ''}`}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, marginBottom: '8px' }}>
          {sign ? `${sign.glyph}  ${sign.name.toUpperCase()} · TODAY` : 'AWAITING SIGNATURE'}
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.8vw, 1.2rem)', fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
          {reading}
        </p>
      </div>
    </div>
  );
};

// ==========================================
// MEOW KITCHEN CLICKER
// ==========================================
const UPGRADES = [
  { id: 'whisk', name: 'Lucky Whisk', cost: 18, power: 1, hint: '+1 crumb / tap' },
  { id: 'oven', name: 'Pixel Oven', cost: 48, power: 3, hint: '+3 crumbs / tap' },
  { id: 'recipe', name: 'Secret Recipe', cost: 110, power: 8, hint: '+8 crumbs / tap' },
];

export const MeowKitchen: React.FC = () => {
  const [crumbs, setCrumbs] = useState(0);
  const [power, setPower] = useState(1);
  const [owned, setOwned] = useState<string[]>([]);
  const [bounce, setBounce] = useState(false);
  const [meows, setMeows] = useState(0);

  const mood = useMemo(() => {
    if (crumbs > 250) return 'Legendary pastry cat. Michelin meow.';
    if (crumbs > 80) return 'The kitchen smells like victory and vanilla.';
    if (crumbs > 20) return 'Warm crumbs. The cat approves, mostly.';
    return 'An empty plate. Tap to cook something cozy.';
  }, [crumbs]);

  const cook = () => {
    soundEngine.playClick(640 + (power * 20), 0.03);
    setCrumbs((c) => c + power);
    setMeows((m) => m + 1);
    setBounce(true);
    window.setTimeout(() => setBounce(false), 140);
  };

  const buy = (id: string, cost: number, extra: number) => {
    if (owned.includes(id) || crumbs < cost) return;
    soundEngine.playSparkle();
    setCrumbs((c) => c - cost);
    setOwned((o) => [...o, id]);
    setPower((p) => p + extra);
  };

  return (
    <div>
      <div style={cardStyle}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', marginBottom: '4px' }}>Meow Kitchen</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-grey)' }}>
            A tiny Comfort Food clicker. Tap the cat, earn crumbs, unlock kitchen upgrades.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={statPill}>Crumbs: {crumbs}</span>
          <span style={statPill}>Power: +{power}</span>
        </div>
      </div>

      <button
        className={`lab-meow-stage${bounce ? ' is-bounce' : ''}`}
        onClick={cook}
        aria-label="Tap the cat to cook"
      >
        <span className="lab-meow-face">{meows % 7 === 0 && meows > 0 ? '😼' : '🐱'}</span>
        <span className="lab-meow-caption">{mood}</span>
        <span className="lab-meow-hint">Tap to cook · {meows} meows served</span>
      </button>

      <div className="lab-upgrade-grid">
        {UPGRADES.map((u) => {
          const have = owned.includes(u.id);
          const can = crumbs >= u.cost && !have;
          return (
            <button
              key={u.id}
              className="lab-upgrade-card"
              disabled={have}
              onClick={() => buy(u.id, u.cost, u.power)}
              style={{
                opacity: have ? 0.7 : 1,
                backgroundColor: have ? 'var(--color-old-rose)' : 'var(--color-soft-blush)',
                color: have ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                cursor: have ? 'default' : can ? 'pointer' : 'not-allowed',
              }}
            >
              <strong>{u.name}</strong>
              <span>{have ? 'Owned' : `${u.cost} crumbs`}</span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>{u.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
