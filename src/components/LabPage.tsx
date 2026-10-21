import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Paintbrush, Eraser, Download, Trash2, Music, Type, Wand2, Play, Copy, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const LabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pixel' | 'chimes' | 'ascii' | 'physics'>('pixel');

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
    // Pre-paint a cute retro heart
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

  const playChimeNote = (freq: number, idx: number) => {
    soundEngine.playChime(freq, 0.6);
    setActiveChimeIdx(idx);
    setTimeout(() => setActiveChimeIdx(null), 300);
  };

  const playSequence = (pattern: number[]) => {
    pattern.forEach((noteIdx, i) => {
      setTimeout(() => {
        if (CHIMES[noteIdx]) {
          playChimeNote(CHIMES[noteIdx].freq, noteIdx);
        }
      }, i * 190);
    });
  };

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

      // Draw subtle grid
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

        // Bounce floor
        if (p.y + p.radius > canvas.height) {
          p.y = canvas.height - p.radius;
          p.vy *= bounce;
        }
        // Bounce walls
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx *= bounce;
        } else if (p.x + p.radius > canvas.width) {
          p.x = canvas.width - p.radius;
          p.vx *= bounce;
        }

        // Draw 4-point sparkle star
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

      // Limit particle count
      if (particlesRef.current.length > 120) {
        particlesRef.current.splice(0, particlesRef.current.length - 120);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 80px',
    }}>
      {/* Lab Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span className="retro-pill">
            <Sparkles size={12} color="var(--color-old-rose)" /> Creative Coding Playground
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', marginBottom: '12px' }}>
          reeee.dev Creative Lab
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-taupe-grey)', fontSize: '1.05rem' }}>
          Interactive web experiments, real-time sound synthesizers, and procedural canvas toys crafted in TypeScript.
        </p>
      </div>

      {/* Lab Sub-Nav Navigation */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '36px',
      }}>
        {[
          { id: 'pixel', label: '1. Retro Pixel Studio', icon: Paintbrush },
          { id: 'chimes', label: '2. Melody Chime Box', icon: Music },
          { id: 'ascii', label: '3. ASCII & Y2K Styler', icon: Type },
          { id: 'physics', label: '4. Sparkle Gravity Toy', icon: Wand2 },
        ].map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playClick(750, 0.04);
                setActiveTab(item.id as typeof activeTab);
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-taupe-grey)',
                backgroundColor: isActive ? 'var(--color-old-rose)' : 'var(--color-pale-slate)',
                color: isActive ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                boxShadow: isActive ? '3px 3px 0px var(--color-taupe-grey)' : '2px 2px 0px var(--color-taupe-grey)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 1. RETRO PIXEL CANVAS TAB */}
      {/* ============================================================== */}
      {activeTab === 'pixel' && (
        <div className="retro-box" style={{
          backgroundColor: 'var(--color-pale-slate)',
          padding: '32px',
          maxWidth: '780px',
          margin: '0 auto',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>16×16 Palette Pixel Canvas</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-grey)' }}>
                Draw retro icons and avatars using the official reeee.dev palette. Export as a crisp PNG!
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={clearCanvas}
                className="retro-btn retro-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                title="Clear canvas"
              >
                <Trash2 size={15} /> Clear
              </button>
              <button
                onClick={exportPNG}
                className="retro-btn"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                title="Download PNG image"
              >
                <Download size={15} /> Export PNG
              </button>
            </div>
          </div>

          {/* Color Picker & Tools Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'var(--color-soft-blush)',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--color-taupe-grey)',
            marginBottom: '24px',
          }}>
            {/* Color Swatches */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginRight: '4px' }}>
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
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: c.hex,
                    border: '2px solid var(--color-taupe-grey)',
                    boxShadow: currentColor === c.hex && !isEraser ? '0 0 0 3px var(--color-old-rose)' : '2px 2px 0px var(--color-taupe-grey)',
                    transform: currentColor === c.hex && !isEraser ? 'scale(1.15)' : 'scale(1)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                />
              ))}
            </div>

            {/* Brush vs Eraser Toggle */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  soundEngine.playClick(600, 0.03);
                  setIsEraser(false);
                }}
                className={`retro-btn ${!isEraser ? '' : 'retro-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              >
                <Paintbrush size={14} /> Brush
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick(400, 0.03);
                  setIsEraser(true);
                }}
                className={`retro-btn ${isEraser ? '' : 'retro-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              >
                <Eraser size={14} /> Eraser
              </button>
            </div>
          </div>

          {/* 16x16 Pixel Grid */}
          <div
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: '100%',
              maxWidth: '380px',
              aspectRatio: '1 / 1',
              margin: '0 auto',
              border: '3px solid var(--color-taupe-grey)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '6px 6px 0px var(--color-taupe-grey)',
              backgroundColor: 'var(--color-taupe-grey)',
              gap: '1px',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            {pixels.map((color, index) => (
              <div
                key={index}
                onClick={() => handlePixelClick(index)}
                onMouseEnter={() => handlePixelMouseEnter(index)}
                style={{
                  backgroundColor: color,
                  cursor: 'crosshair',
                  transition: 'background-color 0.05s ease',
                }}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.8rem', color: 'var(--color-taupe-grey)', fontFamily: 'var(--font-mono)' }}>
            ✦ Click or drag to draw • Powered by HTML5 Canvas &amp; reeee.dev palette tokens
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MELODY CHIME BOX TAB */}
      {/* ============================================================== */}
      {activeTab === 'chimes' && (
        <div className="retro-box" style={{
          backgroundColor: 'var(--color-pale-slate)',
          padding: '32px',
          maxWidth: '780px',
          margin: '0 auto',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Pentatonic Vintage Chime Box</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-grey)' }}>
              A nostalgic Web Audio synthesizer tuned to a soft pentatonic scale. Click keys or trigger preset melodies.
            </p>
          </div>

          {/* Interactive Keyboard Keys */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '8px',
            marginBottom: '32px',
          }}>
            {CHIMES.map((chime, idx) => {
              const isHit = activeChimeIdx === idx;
              return (
                <button
                  key={chime.label}
                  onClick={() => playChimeNote(chime.freq, idx)}
                  style={{
                    height: '160px',
                    backgroundColor: isHit ? 'var(--color-old-rose)' : 'var(--color-soft-blush)',
                    color: isHit ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                    border: '2px solid var(--color-taupe-grey)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: isHit ? '1px 1px 0px var(--color-taupe-grey)' : '3px 5px 0px var(--color-taupe-grey)',
                    transform: isHit ? 'translate(2px, 4px)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '12px 6px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700 }}>
                    [{chime.key}]
                  </span>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-old-rose)',
                    margin: '0 auto',
                    opacity: isHit ? 1 : 0.3,
                  }}></div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800 }}>
                    {chime.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Preset Melodies Bar */}
          <div style={{
            padding: '16px 20px',
            backgroundColor: 'var(--color-soft-blush)',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--color-taupe-grey)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              AUTO PRESETS:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => playSequence([0, 2, 4, 5, 7])}
                className="retro-btn"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                <Play size={13} /> Y2K Startup
              </button>
              <button
                onClick={() => playSequence([4, 2, 0, 2, 4, 4, 4])}
                className="retro-btn retro-btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                <Play size={13} /> Dreamy Rain
              </button>
              <button
                onClick={() => playSequence([0, 4, 3, 5, 7, 7])}
                className="retro-btn retro-btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                <Play size={13} /> Victory Chime
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. ASCII & Y2K TEXT STYLER TAB */}
      {/* ============================================================== */}
      {activeTab === 'ascii' && (
        <div className="retro-box" style={{
          backgroundColor: 'var(--color-pale-slate)',
          padding: '32px',
          maxWidth: '780px',
          margin: '0 auto',
        }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Retro ASCII &amp; Y2K Text Styler</h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-grey)', marginBottom: '20px' }}>
            Transform text into retro banner blocks and stylized Y2K typography with instant 1-click clipboard copy.
          </p>

          {/* Text Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
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
                padding: '12px 16px',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--color-soft-blush)',
                border: '2px solid var(--color-taupe-grey)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '3px 3px 0px var(--color-taupe-grey)',
                outline: 'none',
              }}
            />
          </div>

          {/* ASCII Banner Card */}
          <div style={{
            backgroundColor: '#2b2326',
            color: 'var(--color-soft-blush)',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--color-taupe-grey)',
            padding: '16px',
            marginBottom: '20px',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-cool-steel)' }}>
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
              fontSize: '0.85rem',
              overflowX: 'auto',
              color: 'var(--color-soft-blush)',
              lineHeight: 1.4,
            }}>
              {generateAscii(inputText)}
            </pre>
          </div>

          {/* Alternate Y2K Styles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
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
                  padding: '14px',
                  backgroundColor: 'var(--color-soft-blush)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--color-taupe-grey)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
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
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600 }}>
                  {st.styled}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. SPARKLE GRAVITY TAB */}
      {/* ============================================================== */}
      {activeTab === 'physics' && (
        <div className="retro-box" style={{
          backgroundColor: 'var(--color-pale-slate)',
          padding: '32px',
          maxWidth: '780px',
          margin: '0 auto',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Sparkle Gravity Physics Pad</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-grey)' }}>
                Click or drag across the interactive canvas to drop bouncy retro stars with velocity and restitution.
              </p>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick(350, 0.05);
                particlesRef.current = [];
              }}
              className="retro-btn retro-btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              <Trash2 size={15} /> Clear Canvas
            </button>
          </div>

          {/* Interactive Physics Canvas */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            border: '2px solid var(--color-taupe-grey)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '4px 4px 0px var(--color-taupe-grey)',
            overflow: 'hidden',
            cursor: 'pointer',
          }}>
            <canvas
              ref={canvasRef}
              width={700}
              height={380}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const scaleX = 700 / rect.width;
                const scaleY = 380 / rect.height;
                addSparkle((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
              }}
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const scaleX = 700 / rect.width;
                  const scaleY = 380 / rect.height;
                  addSparkle((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />

            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: 'rgba(255, 219, 218, 0.9)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-taupe-grey)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              pointerEvents: 'none',
            }}>
              Click or drag anywhere to drop sparkles ✦
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
