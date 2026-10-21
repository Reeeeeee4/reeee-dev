import React from 'react';

export const Y2KBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 1. Large 4-point Starburst (Top Left) */}
      <svg
        className="y2k-float-slow"
        style={{
          position: 'absolute',
          top: '8%',
          left: '3%',
          width: '74px',
          height: '74px',
          opacity: 0.38,
          color: 'var(--color-old-rose)',
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 0 C50 27.6 72.4 50 100 50 C72.4 50 50 72.4 50 100 C50 72.4 27.6 50 0 50 C27.6 50 50 27.6 50 0 Z" />
      </svg>

      {/* 2. Sparkle Cluster (Top Center-Right) */}
      <div
        className="y2k-shimmer"
        style={{
          position: 'absolute',
          top: '6%',
          right: '18%',
          opacity: 0.45,
          color: 'var(--color-taupe-grey)',
          fontSize: '28px',
          lineHeight: 1,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '32px', color: 'var(--color-old-rose)' }}>✦</span>
        <span style={{ fontSize: '18px', marginTop: '-12px' }}>✧</span>
        <span style={{ fontSize: '14px', marginTop: '10px', color: 'var(--color-old-rose)' }}>✦</span>
      </div>

      {/* 3. Retro Wireframe Cyber Globe (Top Right behind Hero) */}
      <svg
        className="y2k-spin-slow"
        style={{
          position: 'absolute',
          top: '14%',
          right: '2%',
          width: '110px',
          height: '110px',
          opacity: 0.22,
          color: 'var(--color-taupe-grey)',
        }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="46" />
        {/* Latitude lines */}
        <ellipse cx="50" cy="50" rx="46" ry="22" />
        <line x1="4" y1="50" x2="96" y2="50" />
        {/* Longitude lines */}
        <ellipse cx="50" cy="50" rx="22" ry="46" />
        <line x1="50" y1="4" x2="50" y2="96" />
      </svg>

      {/* 4. Y2K Cyber Heart with Starburst (Left Mid) */}
      <svg
        className="y2k-drift"
        style={{
          position: 'absolute',
          top: '38%',
          left: '2%',
          width: '68px',
          height: '68px',
          opacity: 0.32,
          color: 'var(--color-old-rose)',
        }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path
          d="M50 82 C25 64 10 46 10 28 C10 14 20 6 34 6 C42 6 47 10 50 16 C53 10 58 6 66 6 C80 6 90 14 90 28 C90 46 75 64 50 82 Z"
          fill="rgba(219, 127, 142, 0.15)"
        />
        {/* Star in Heart Center */}
        <path
          d="M50 24 C50 32 55 37 63 37 C55 37 50 42 50 50 C50 42 45 37 37 37 C45 37 50 32 50 24 Z"
          fill="currentColor"
        />
      </svg>

      {/* 5. Eight-Point Cyber Star (Right Mid) */}
      <svg
        className="y2k-float-slow"
        style={{
          position: 'absolute',
          top: '46%',
          right: '3%',
          width: '80px',
          height: '80px',
          opacity: 0.28,
          color: 'var(--color-taupe-grey)',
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        {/* Main 4 points */}
        <path d="M50 0 C50 28 72 50 100 50 C72 50 50 72 50 100 C50 72 28 50 0 50 C28 50 50 28 50 0 Z" />
        {/* Diagonal 4 points */}
        <path
          d="M50 0 C50 28 72 50 100 50 C72 50 50 72 50 100 C50 72 28 50 0 50 C28 50 50 28 50 0 Z"
          transform="rotate(45 50 50)"
          opacity="0.6"
        />
      </svg>

      {/* 6. Y2K Cyber Flower / 4-Petal Badge (Left Lower) */}
      <svg
        className="y2k-shimmer"
        style={{
          position: 'absolute',
          top: '68%',
          left: '3%',
          width: '76px',
          height: '76px',
          opacity: 0.3,
          color: 'var(--color-old-rose)',
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="24" r="18" opacity="0.75" />
        <circle cx="50" cy="76" r="18" opacity="0.75" />
        <circle cx="24" cy="50" r="18" opacity="0.75" />
        <circle cx="76" cy="50" r="18" opacity="0.75" />
        <circle cx="50" cy="50" r="14" fill="var(--color-soft-blush)" />
        <circle cx="50" cy="50" r="6" fill="var(--color-taupe-grey)" />
      </svg>

      {/* 7. Saturn Ring Planet (Right Lower) */}
      <svg
        className="y2k-drift"
        style={{
          position: 'absolute',
          top: '76%',
          right: '4%',
          width: '90px',
          height: '90px',
          opacity: 0.25,
          color: 'var(--color-taupe-grey)',
        }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <circle cx="50" cy="50" r="24" fill="rgba(219, 127, 142, 0.2)" />
        {/* Ring tilted */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="12"
          transform="rotate(-25 50 50)"
        />
      </svg>

      {/* 8. Hollow 4-point Diamond Crosshair (Bottom Center) */}
      <svg
        className="y2k-shimmer"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '12%',
          width: '56px',
          height: '56px',
          opacity: 0.35,
          color: 'var(--color-old-rose)',
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 5 C50 30 70 50 95 50 C70 50 50 70 50 95 C50 70 30 50 5 50 C30 50 50 30 50 5 Z M50 38 C43.4 38 38 43.4 38 50 C38 56.6 43.4 62 50 62 C56.6 62 62 56.6 62 50 C62 43.4 56.6 38 50 38 Z" />
      </svg>

      {/* 9. Floating Y2K cross stars & sparkles across screen */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '48%',
        color: 'var(--color-old-rose)',
        opacity: 0.3,
        fontSize: '24px',
      }} className="y2k-shimmer">
        ✦
      </div>
      <div style={{
        position: 'absolute',
        top: '55%',
        right: '48%',
        color: 'var(--color-taupe-grey)',
        opacity: 0.25,
        fontSize: '20px',
      }} className="y2k-drift">
        ✧
      </div>
      <div style={{
        position: 'absolute',
        top: '88%',
        right: '25%',
        color: 'var(--color-old-rose)',
        opacity: 0.35,
        fontSize: '26px',
      }} className="y2k-float-slow">
        ✦
      </div>
    </div>
  );
};
