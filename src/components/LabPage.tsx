import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Sparkles, Paintbrush, Eraser, Download, Trash2, Music, Type, Wand2, Play, Copy, Check, LayoutGrid, Star, Moon, Cat } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { CosmicOracle, MeowKitchen, MemoryMatch, StarCatcher } from './LabMiniGames';

interface LabPageProps {
  onBackToHome?: () => void;
}

export const LabPage: React.FC<LabPageProps> = ({ onBackToHome }) => {
  type LabTab = 'pixel' | 'chimes' | 'ascii' | 'physics' | 'memory' | 'stars' | 'oracle' | 'meow';
  const [activeTab, setActiveTab] = useState<LabTab>('pixel');

  // ==========================================
  // MINI-APP 1: RETRO PIXEL CANVAS (16x16)
  // ==========================================
  const GRID_SIZE = 16;
  const PALETTE = [
    { name: 'Soft Blush', hex: '#FFDBDA' },
    { name: 'Old Rose', hex: '#DB7F8E' },
    { name: 'Pale Slate', hex: '#D5C5C8' },
    { name: 'Cool Steel', hex: '#9DA3A4' },
    { name: 'Taupe Grey', hex: '#604D53' },
  ];

  const [currentColor, setCurrentColor] = useState<string>('#DB7F8E');
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [pixels, setPixels] = useState<string[]>(() => {
    // Default cute heart / star pixel art in center
    const arr = Array(GRID_SIZE * GRID_SIZE).fill('#FFDBDA');
    const heartIndices = [
      GRID_SIZE * 5 + 6, GRID_SIZE * 5 + 7, GRID_SIZE * 5 + 9, GRID_SIZE * 5 + 10,
      GRID_SIZE * 6 + 5, GRID_SIZE * 6 + 6, GRID_SIZE * 6 + 7, GRID_SIZE * 6 + 8, GRID_SIZE * 6 + 9, GRID_SIZE * 6 + 10, GRID_SIZE * 6 + 11,
      GRID_SIZE * 7 + 5, GRID_SIZE * 7 + 6, GRID_SIZE * 7 + 7, GRID_SIZE * 7 + 8, GRID_SIZE * 7 + 9, GRID_SIZE * 7 + 10, GRID_SIZE * 7 + 11,
      GRID_SIZE * 8 + 6, GRID_SIZE * 8 + 7, GRID_SIZE * 8 + 8, GRID_SIZE * 8 + 9, GRID_SIZE * 8 + 10,
      GRID_SIZE * 9 + 7, GRID_SIZE * 9 + 8, GRID_SIZE * 9 + 9,
      GRID_SIZE * 10 + 8
    ];
    heartIndices.forEach(idx => { arr[idx] = '#DB7F8E'; });
    return arr;
  });

  const handlePixelClick = (index: number) => {
    soundEngine.playClick(isEraser ? 400 : 700 + (index % 16) * 20, 0.03);
    const updated = [...pixels];
    updated[index] = isEraser ? '#FFDBDA' : currentColor;
    setPixels(updated);
  };

  const handlePixelMouseEnter = (index: number) => {
    if (!isDrawing) return;
    const updated = [...pixels];
    updated[index] = isEraser ? '#FFDBDA' : currentColor;
    setPixels(updated);
  };

  const handlePixelTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
    if (target && target.dataset && target.dataset.pixelIndex !== undefined) {
      const idx = parseInt(target.dataset.pixelIndex, 10);
      if (!isNaN(idx) && pixels[idx] !== (isEraser ? '#FFDBDA' : currentColor)) {
        soundEngine.playClick(isEraser ? 400 : 700 + (idx % 16) * 20, 0.02);
        const updated = [...pixels];
        updated[idx] = isEraser ? '#FFDBDA' : currentColor;
        setPixels(updated);
      }
    }
  };

  const clearCanvas = () => {
    soundEngine.playClick(350, 0.06);
    setPixels(Array(GRID_SIZE * GRID_SIZE).fill('#FFDBDA'));
  };

  const exportPNG = () => {
    soundEngine.playSparkle();
    const canvas = document.createElement('canvas');
    const scale = 20; // 16 * 20 = 320x320 px
    canvas.width = GRID_SIZE * scale;
    canvas.height = GRID_SIZE * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const color = pixels[y * GRID_SIZE + x];
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }

    const link = document.createElement('a');
    link.download = 'reeee-pixel-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // ==========================================
  // MINI-APP 2: MELODY CHIME BOX
  // ==========================================
  const CHIMES = [
    { label: 'C4', freq: 261.63, key: '1' },
    { label: 'D4', freq: 293.66, key: '2' },
    { label: 'E4', freq: 329.63, key: '3' },
    { label: 'G4', freq: 392.00, key: '4' },
    { label: 'A4', freq: 440.00, key: '5' },
    { label: 'C5', freq: 523.25, key: '6' },
    { label: 'D5', freq: 587.33, key: '7' },
    { label: 'E5', freq: 659.25, key: '8' },
  ];
  const [activeChimeIdx, setActiveChimeIdx] = useState<number | null>(null);

  const playChimeNote = useCallback((freq: number, idx: number) => {
    soundEngine.playChime(freq, 0.6);
    setActiveChimeIdx(idx);
    setTimeout(() => setActiveChimeIdx(null), 300);
  }, []);

  const playSequence = (pattern: number[]) => {
    pattern.forEach((noteIdx, i) => {
      setTimeout(() => {
        if (CHIMES[noteIdx]) {
          playChimeNote(CHIMES[noteIdx].freq, noteIdx);
        }
      }, i * 190);
    });
  };

  // Enable keyboard keys 1-8 to trigger chimes
  useEffect(() => {
    if (activeTab !== 'chimes') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= 8) {
        const idx = keyNum - 1;
        if (CHIMES[idx]) {
          e.preventDefault();
          playChimeNote(CHIMES[idx].freq, idx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, playChimeNote]);

  // ==========================================
  // MINI-APP 3: ASCII & Y2K TEXT STYLER
  // ==========================================
  const [inputText, setInputText] = useState('reeee.dev');
  const [asciiCopied, setAsciiCopied] = useState<string | null>(null);

  const generateAscii = (text: string) => {
    const clean = text.toUpperCase().slice(0, 10) || 'REEEE';
    const lines = [
      `  .---.  .---.  .---.  .---.  .---.  `,
      ` /       |      |___   |___   |___   `,
      ` |   --. |---|  |      |      |      `,
      ` \\_____| |___/  |___|  |___|  |___|  `,
    ];
    return `// ======================================\n// reeee.dev ASCII GENERATOR: "${clean}"\n// ======================================\n` + lines.join('\n');
  };

  const copyToClipboard = (text: string, id: string) => {
    soundEngine.playSparkle();
    navigator.clipboard.writeText(text);
    setAsciiCopied(id);
    setTimeout(() => setAsciiCopied(null), 2000);
  };

  // ==========================================
  // MINI-APP 4: SPARKLE GRAVITY PHYSICS CANVAS
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    radius: number;
    rotation: number;
    vRot: number;
  }>>([]);

  const addSparkle = useCallback((x: number, y: number) => {
    soundEngine.playClick(900, 0.03);
    const colors = ['#DB7F8E', '#D5C5C8', '#9DA3A4', '#604D53', '#FFFFFF'];
    for (let i = 0; i < 6; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.7) * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 5 + 4,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.2,
      });
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'physics') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.fillStyle = '#FFDBDA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(96, 77, 83, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const gravity = 0.25;
      const friction = 0.98;
      const bounce = -0.7;

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y + p.radius > canvas.height) {
          p.y = canvas.height - p.radius;
          p.vy *= bounce;
        }
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx *= bounce;
        } else if (p.x + p.radius > canvas.width) {
          p.x = canvas.width - p.radius;
          p.vx *= bounce;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = '#604D53';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        const r = p.radius;
        ctx.moveTo(0, -r * 2);
        ctx.quadraticCurveTo(0, 0, r * 2, 0);
        ctx.quadraticCurveTo(0, 0, 0, r * 2);
        ctx.quadraticCurveTo(0, 0, -r * 2, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      if (particlesRef.current.length > 120) {
        particlesRef.current.splice(0, particlesRef.current.length - 120);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 700 / rect.width;
    const scaleY = 350 / rect.height;
    for (let i = 0; i < e.touches.length; i++) {
      const t = e.touches[i];
      addSparkle((t.clientX - rect.left) * scaleX, (t.clientY - rect.top) * scaleY);
    }
  };

  return (
    <div className="lab-container">
      {/* Top Back Navigation Bar */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => {
            soundEngine.playClick(600, 0.04);
            if (onBackToHome) {
              onBackToHome();
            } else {
              window.history.back();
            }
          }}
          className="retro-btn retro-btn-secondary"
          style={{
            padding: '7px 14px',
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          title="Return to Home Portfolio"
        >
          <ArrowLeft size={15} />
          <span>Back to Portfolio</span>
        </button>
      </div>

      {/* Lab Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span className="retro-pill">
            <Sparkles size={12} color="var(--color-old-rose)" /> Creative Coding Playground
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', marginBottom: '8px' }}>
          reeee.dev Creative Lab
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--color-taupe-grey)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.5 }}>
          Interactive toys you can play in the browser: pixel art, chimes, matching games, star catching, a tiny horoscope oracle, and a cozy clicker.
        </p>
      </div>

      {/* Lab Sub-Nav Navigation */}
      <div className="lab-subnav-grid">
        {[
          { id: 'pixel', label: '1. Retro Pixel Studio', shortLabel: 'Pixels', icon: Paintbrush },
          { id: 'chimes', label: '2. Melody Chime Box', shortLabel: 'Chimes', icon: Music },
          { id: 'ascii', label: '3. ASCII & Y2K Styler', shortLabel: 'ASCII', icon: Type },
          { id: 'physics', label: '4. Sparkle Gravity Toy', shortLabel: 'Gravity', icon: Wand2 },
          { id: 'memory', label: '5. Memory Match', shortLabel: 'Memory', icon: LayoutGrid },
          { id: 'stars', label: '6. Star Catcher', shortLabel: 'Stars', icon: Star },
          { id: 'oracle', label: '7. Cosmic Oracle', shortLabel: 'Oracle', icon: Moon },
          { id: 'meow', label: '8. Meow Kitchen', shortLabel: 'Meow', icon: Cat },
        ].map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playClick(750, 0.04);
                setActiveTab(item.id as LabTab);
              }}
              className="lab-tab-btn"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-taupe-grey)',
                backgroundColor: isActive ? 'var(--color-old-rose)' : 'var(--color-pale-slate)',
                color: isActive ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                boxShadow: isActive ? '3px 3px 0px var(--color-taupe-grey)' : '2px 2px 0px var(--color-taupe-grey)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={15} />
              <span className="lab-tab-label-full">{item.label}</span>
              <span className="lab-tab-label-short">{item.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* 1. RETRO PIXEL CANVAS TAB */}
      {activeTab === 'pixel' && (
        <div className="lab-card">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', marginBottom: '4px' }}>16×16 Palette Pixel Canvas</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-grey)' }}>
                Draw retro icons and avatars using the official reeee.dev palette. Export as a crisp PNG!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={clearCanvas}
                className="retro-btn retro-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                title="Clear canvas"
              >
                <Trash2 size={14} /> Clear
              </button>
              <button
                onClick={exportPNG}
                className="retro-btn"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                title="Download PNG image"
              >
                <Download size={14} /> Export PNG
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            padding: '10px 12px',
            backgroundColor: 'var(--color-soft-blush)',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--color-taupe-grey)',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginRight: '2px' }}>
                PALETTE:
              </span>
              {PALETTE.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    soundEngine.playClick(600, 0.03);
                    setCurrentColor(c.hex);
                    setIsEraser(false);
                  }}
                  title={c.name}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    backgroundColor: c.hex,
                    border: '2px solid var(--color-taupe-grey)',
                    boxShadow: currentColor === c.hex && !isEraser ? '0 0 0 2.5px var(--color-old-rose)' : '1.5px 1.5px 0px var(--color-taupe-grey)',
                    transform: currentColor === c.hex && !isEraser ? 'scale(1.15)' : 'scale(1)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => {
                  soundEngine.playClick(600, 0.03);
                  setIsEraser(false);
                }}
                className={`retro-btn ${!isEraser ? '' : 'retro-btn-secondary'}`}
                style={{ padding: '5px 10px', fontSize: '0.78rem' }}
              >
                <Paintbrush size={13} /> Brush
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick(400, 0.03);
                  setIsEraser(true);
                }}
                className={`retro-btn ${isEraser ? '' : 'retro-btn-secondary'}`}
                style={{ padding: '5px 10px', fontSize: '0.78rem' }}
              >
                <Eraser size={13} /> Eraser
              </button>
            </div>
          </div>

          <div
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={handlePixelTouchMove}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: '100%',
              maxWidth: 'min(100%, 330px)',
              aspectRatio: '1 / 1',
              margin: '0 auto',
              border: '3px solid var(--color-taupe-grey)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '4px 4px 0px var(--color-taupe-grey)',
              backgroundColor: 'var(--color-taupe-grey)',
              gap: '1px',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            {pixels.map((color, index) => (
              <div
                key={index}
                data-pixel-index={index}
                onClick={() => handlePixelClick(index)}
                onMouseEnter={() => handlePixelMouseEnter(index)}
                onTouchStart={() => handlePixelClick(index)}
                style={{
                  backgroundColor: color,
                  cursor: 'crosshair',
                  transition: 'background-color 0.05s ease',
                }}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--color-taupe-grey)', fontFamily: 'var(--font-mono)' }}>
            ✦ Tap or drag to draw • Powered by HTML5 Canvas &amp; palette tokens
          </div>
        </div>
      )}

      {/* 2. MELODY CHIME BOX TAB */}
      {activeTab === 'chimes' && (
        <div className="lab-card">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', marginBottom: '6px' }}>
              Pentatonic Vintage Chime Box
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-grey)', maxWidth: '540px', margin: '0 auto' }}>
              A nostalgic Web Audio synthesizer tuned to a soft pentatonic scale. Tap chime keys, slide across, or trigger presets below.
            </p>
          </div>

          {/* Responsive Chime Keys: 8 keys on desktop, 4x2 on mobile */}
          <div className="chime-keys-grid">
            {CHIMES.map((chime, idx) => {
              const isHit = activeChimeIdx === idx;
              return (
                <button
                  key={chime.label}
                  onClick={() => playChimeNote(chime.freq, idx)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    playChimeNote(chime.freq, idx);
                  }}
                  className="chime-key-btn"
                  style={{
                    backgroundColor: isHit ? 'var(--color-old-rose)' : 'var(--color-soft-blush)',
                    color: isHit ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                    boxShadow: isHit ? '1px 1px 0px var(--color-taupe-grey)' : '3px 3px 0px var(--color-taupe-grey)',
                    transform: isHit ? 'translate(2px, 2px)' : 'none',
                  }}
                  title={`Play Note ${chime.label} (Press ${chime.key})`}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700 }}>
                    [{chime.key}]
                  </span>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isHit ? 'var(--color-soft-blush)' : 'var(--color-old-rose)',
                    margin: '0 auto',
                    opacity: isHit ? 1 : 0.35,
                    transition: 'all 0.1s ease',
                  }}></div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.82rem, 2.5vw, 0.95rem)', fontWeight: 800 }}>
                    {chime.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Octave Label for Mobile 4x2 Clarity */}
          <div className="chime-octave-hint" style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-taupe-grey)',
            opacity: 0.8,
            marginBottom: '16px',
            padding: '0 4px',
          }}>
            <span>✦ Octave 4: C4, D4, E4, G4</span>
            <span>✦ Octave 5: A4, C5, D5, E5</span>
          </div>

          {/* Auto Presets Bar */}
          <div className="chime-presets-bar">
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              AUTO PRESETS:
            </span>
            <div className="chime-presets-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button
                onClick={() => playSequence([0, 2, 4, 5, 7])}
                className="retro-btn"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <Play size={12} /> Y2K Startup
              </button>
              <button
                onClick={() => playSequence([4, 2, 0, 2, 4, 4, 4])}
                className="retro-btn retro-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <Play size={12} /> Dreamy Rain
              </button>
              <button
                onClick={() => playSequence([0, 4, 3, 5, 7, 7])}
                className="retro-btn retro-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <Play size={12} /> Victory Chime
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. ASCII & Y2K TEXT STYLER TAB */}
      {activeTab === 'ascii' && (
        <div className="lab-card">
          <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', marginBottom: '4px' }}>Retro ASCII &amp; Y2K Text Styler</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-grey)', marginBottom: '16px' }}>
            Transform text into retro banner blocks and stylized Y2K typography with instant 1-click clipboard copy.
          </p>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
              TYPE YOUR TEXT (MAX 12 CHARS):
            </label>
            <input
              type="text"
              maxLength={12}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="reeee.dev"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--color-soft-blush)',
                border: '2px solid var(--color-taupe-grey)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '3px 3px 0px var(--color-taupe-grey)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{
            backgroundColor: '#2b2326',
            color: 'var(--color-soft-blush)',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--color-taupe-grey)',
            padding: '14px',
            marginBottom: '16px',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-cool-steel)' }}>
                ASCII BANNER BLOCK
              </span>
              <button
                onClick={() => copyToClipboard(generateAscii(inputText), 'ascii')}
                className="retro-btn"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                {asciiCopied === 'ascii' ? <Check size={12} color="#52b788" /> : <Copy size={12} />}
                {asciiCopied === 'ascii' ? 'Copied!' : 'Copy ASCII'}
              </button>
            </div>
            <pre style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 2.2vw, 0.82rem)',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              maxWidth: '100%',
              color: 'var(--color-soft-blush)',
              lineHeight: 1.4,
            }}>
              {generateAscii(inputText)}
            </pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {[
              {
                id: 'fullwidth',
                title: 'Fullwidth Vaporwave',
                styled: inputText.split('').map(c => String.fromCharCode(c.charCodeAt(0) + (c.charCodeAt(0) >= 33 && c.charCodeAt(0) <= 126 ? 65248 : 0))).join('')
              },
              {
                id: 'sparkle',
                title: 'Sparkle Shrines',
                styled: `✦*:. ${inputText} .:*✦`
              },
              {
                id: 'leet',
                title: 'Cyber 1337',
                styled: inputText.replace(/e/gi, '3').replace(/a/gi, '4').replace(/o/gi, '0').replace(/t/gi, '7')
              }
            ].map((st) => (
              <div
                key={st.id}
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-soft-blush)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--color-taupe-grey)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {st.title}
                  </span>
                  <button
                    onClick={() => copyToClipboard(st.styled, st.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-old-rose)' }}
                    title="Copy styled text"
                  >
                    {asciiCopied === st.id ? <Check size={14} color="#2b9348" /> : <Copy size={14} />}
                  </button>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600, wordBreak: 'break-all' }}>
                  {st.styled}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SPARKLE GRAVITY TAB */}
      {activeTab === 'physics' && (
        <div className="lab-card">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', marginBottom: '4px' }}>Sparkle Gravity Physics Pad</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-grey)' }}>
                Tap or drag across the interactive canvas to drop bouncy retro stars with velocity and bounce.
              </p>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick(350, 0.05);
                particlesRef.current = [];
              }}
              className="retro-btn retro-btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              <Trash2 size={14} /> Clear Canvas
            </button>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(260px, 45vh, 360px)',
            border: '2px solid var(--color-taupe-grey)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '4px 4px 0px var(--color-taupe-grey)',
            overflow: 'hidden',
            cursor: 'pointer',
            touchAction: 'none',
          }}>
            <canvas
              ref={canvasRef}
              width={700}
              height={350}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const scaleX = 700 / rect.width;
                const scaleY = 350 / rect.height;
                addSparkle((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
              }}
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const scaleX = 700 / rect.width;
                  const scaleY = 350 / rect.height;
                  addSparkle((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
                }
              }}
              onTouchStart={handleCanvasTouch}
              onTouchMove={handleCanvasTouch}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                touchAction: 'none',
              }}
            />

            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              backgroundColor: 'rgba(255, 219, 218, 0.92)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-taupe-grey)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              pointerEvents: 'none',
            }}>
              Tap or drag anywhere to drop sparkles ✦
            </div>
          </div>
        </div>
      )}

      {activeTab === 'memory' && (
        <div className="lab-card lab-card-wide">
          <MemoryMatch />
        </div>
      )}

      {activeTab === 'stars' && (
        <div className="lab-card lab-card-wide">
          <StarCatcher />
        </div>
      )}

      {activeTab === 'oracle' && (
        <div className="lab-card lab-card-wide">
          <CosmicOracle />
        </div>
      )}

      {activeTab === 'meow' && (
        <div className="lab-card lab-card-wide">
          <MeowKitchen />
        </div>
      )}

      {/* Embedded Responsive Styles for Creative Lab */}
      <style>{`
        .lab-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px 80px;
        }
        
        .lab-subnav-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 28px;
        }

        .lab-subnav-grid > * {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .lab-tab-btn {
          padding: 8px 10px;
          font-size: 0.82rem;
          min-height: 44px;
          min-width: 0;
          width: 100%;
          white-space: normal;
          text-align: center;
          touch-action: manipulation;
      }

        .lab-tab-label-short {
          display: none;
        }

        .lab-tab-label-full {
          display: inline;
        }

        .lab-card {
          background-color: var(--color-pale-slate);
          padding: 24px;
          max-width: 780px;
          margin: 0 auto;
          border: var(--border-retro);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-retro);
        }

        .lab-card-wide {
          max-width: 860px;
        }

        .lab-memory-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        .lab-memory-card {
          aspect-ratio: 1 / 1;
          min-height: 56px;
          border: 2px solid var(--color-taupe-grey);
          border-radius: var(--radius-md);
          box-shadow: 2px 2px 0 var(--color-taupe-grey);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          touch-action: manipulation;
          font-size: 1.2rem;
        }

        .lab-star-stage {
          position: relative;
          width: 100%;
          height: clamp(240px, 48vh, 380px);
          overflow: hidden;
          border: 2px solid var(--color-taupe-grey);
          border-radius: var(--radius-md);
          box-shadow: 3px 3px 0 var(--color-taupe-grey);
          background:
            radial-gradient(circle at 20% 20%, rgba(219, 127, 142, 0.22), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(157, 163, 164, 0.25), transparent 45%),
            var(--color-soft-blush);
          touch-action: none;
        }

        .lab-star-empty {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 16px;
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--color-taupe-grey);
          pointer-events: none;
        }

        .lab-falling-star {
          position: absolute;
          transform: translate(-50%, -50%);
          border: 2px solid var(--color-taupe-grey);
          border-radius: 50%;
          background: var(--color-old-rose);
          color: var(--color-soft-blush);
          font-size: 1rem;
          box-shadow: 2px 2px 0 var(--color-taupe-grey);
          cursor: pointer;
          touch-action: manipulation;
        }

        .lab-oracle-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 14px;
        }

        .lab-oracle-sign {
          min-height: 52px;
          padding: 8px 6px;
          border: 2px solid var(--color-taupe-grey);
          border-radius: var(--radius-md);
          box-shadow: 2px 2px 0 var(--color-taupe-grey);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.78rem;
          cursor: pointer;
          touch-action: manipulation;
        }

        .lab-oracle-card {
          padding: 16px;
          border: 2px solid var(--color-taupe-grey);
          border-radius: var(--radius-md);
          background: var(--color-soft-blush);
          box-shadow: 3px 3px 0 var(--color-taupe-grey);
          min-height: 120px;
        }

        .lab-oracle-card.is-spinning {
          opacity: 0.55;
        }

        .lab-meow-stage {
          width: 100%;
          min-height: 180px;
          margin-bottom: 14px;
          padding: 20px 16px;
          border: 2px solid var(--color-taupe-grey);
          border-radius: var(--radius-md);
          box-shadow: 3px 3px 0 var(--color-taupe-grey);
          background: var(--color-soft-blush);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          touch-action: manipulation;
          color: var(--color-taupe-grey);
        }

        .lab-meow-face {
          font-size: clamp(3rem, 10vw, 4.4rem);
          line-height: 1;
        }

        .lab-meow-caption {
          font-family: var(--font-display);
          font-weight: 800;
          text-align: center;
          font-size: clamp(0.95rem, 2.6vw, 1.15rem);
        }

        .lab-meow-hint {
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        .lab-meow-stage.is-bounce .lab-meow-face {
          transform: scale(1.12);
        }

        .lab-upgrade-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .lab-upgrade-card {
          min-height: 88px;
          padding: 12px 10px;
          border: 2px solid var(--color-taupe-grey);
          border-radius: var(--radius-md);
          box-shadow: 2px 2px 0 var(--color-taupe-grey);
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
          font-family: var(--font-display);
          touch-action: manipulation;
        }

        /* Chime Keys Grid: 8 on desktop, 4x2 on mobile */
        .chime-keys-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 8px;
          margin-bottom: 20px;
          width: 100%;
        }

        .chime-key-btn {
          height: 140px;
          border: 2px solid var(--color-taupe-grey);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px 4px;
          cursor: pointer;
          transition: all 0.1s ease;
          user-select: none;
          touch-action: manipulation;
        }

        .chime-presets-bar {
          padding: 14px 16px;
          background-color: var(--color-soft-blush);
          border-radius: var(--radius-md);
          border: 2px solid var(--color-taupe-grey);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        /* Mobile specific adjustments (<= 640px) */
        @media (max-width: 640px) {
          .lab-container {
            padding: 16px 10px 72px;
          }

          .lab-subnav-grid {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            gap: 6px;
            margin: 0 -10px 22px;
            padding: 2px 10px 10px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x proximity;
          }

          .lab-tab-btn {
            padding: 10px 12px;
            font-size: 0.78rem;
            flex: 0 0 auto;
            scroll-snap-align: start;
          }

          .lab-tab-label-full {
            display: none;
          }

          .lab-tab-label-short {
            display: inline;
          }

          .lab-card {
            padding: 16px 12px;
          }

          /* 4 columns x 2 rows for Chime keys on mobile */
          .chime-keys-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 16px;
          }

          .chime-key-btn {
            height: 92px;
            padding: 8px 4px;
          }

          .chime-presets-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .chime-presets-buttons {
            display: grid !important;
            grid-template-columns: 1fr;
            gap: 6px;
            width: 100%;
          }

          .chime-presets-buttons button {
            width: 100%;
            justify-content: center;
          }

          .lab-oracle-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .lab-upgrade-grid {
            grid-template-columns: 1fr;
          }

          .lab-memory-grid {
            gap: 6px;
          }

          .lab-memory-card {
            min-height: 64px;
          }
        }

        @media (max-width: 420px) {
          .lab-oracle-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};
