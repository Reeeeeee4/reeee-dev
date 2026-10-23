import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { LabPage } from './components/LabPage';
import { Footer } from './components/Footer';
import { MarqueeBanner } from './components/MarqueeBanner';
import { Y2KBackground } from './components/Y2KBackground';
import { fairyDustCursor } from 'cursor-effects';

export const App: React.FC = () => {
  // Read initial path to support direct loading of /creative-lab
  const getInitialTab = (): string => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('creative-lab') || path.includes('/lab')) {
        return 'lab';
      }
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  // Listen to browser Back and Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('creative-lab') || path.includes('/lab')) {
        setActiveTab('lab');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Tim Holman's 90s/Y2K Fairy Dust Cursor Effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user has fine pointer device (mouse / trackpad)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    try {
      const cursor = fairyDustCursor({
        colors: ['#DB7F8E', '#604D53', '#9DA3A4', '#FFDBDA', '#ffffff'],
      });

      return () => {
        cursor?.destroy?.();
      };
    } catch (e) {
      console.warn('Fairy dust cursor effect initialization skipped:', e);
    }
  }, []);

  // Subtle retro ambient motion for the background accents
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const layers = Array.from(document.querySelectorAll('.float-retro-layer')) as HTMLElement[];
    if (!layers.length) return;

    let pointerX = 50;
    let pointerY = 50;
    let currentX = 50;
    let currentY = 50;
    let scrollY = window.scrollY || 0;
    let rafId = 0;

    const animate = () => {
      currentX += (pointerX - currentX) * 0.08;
      currentY += (pointerY - currentY) * 0.08;

      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.22;
        const driftX = ((currentX - 50) * speed * 1.3);
        const driftY = ((currentY - 50) * speed * 0.8) + (scrollY * (0.04 + index * 0.015)) + Math.sin((performance.now() * 0.001) + index) * 8;
        const rotate = ((currentX - 50) * 0.18) + index * 8;
        layer.style.transform = `translate(${driftX}px, ${driftY}px) rotate(${rotate}deg)`;
      });

      rafId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 100;
      pointerY = (event.clientY / window.innerHeight) * 100;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    if (hasPointer) {
      window.addEventListener('pointermove', handlePointerMove);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = window.requestAnimationFrame(animate);

    return () => {
      if (hasPointer) {
        window.removeEventListener('pointermove', handlePointerMove);
      }
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll-triggered reveal animation for retro cards
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const revealCards = Array.from(document.querySelectorAll('.retro-box')) as HTMLElement[];
    if (!revealCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    });

    revealCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const navigateTo = (tab: string) => {
    if (tab === 'lab') {
      // Update browser URL to /creative-lab so Back button works
      if (window.location.pathname !== '/creative-lab') {
        window.history.pushState({ page: 'creative-lab' }, '', '/creative-lab');
      }
      setActiveTab('lab');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If we were on /creative-lab, update URL back to /
      if (window.location.pathname.includes('creative-lab') || window.location.pathname.includes('/lab')) {
        window.history.pushState({ page: 'home' }, '', '/');
      }
      setActiveTab(tab);

      if (tab === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // If navigating to an anchor section
        setTimeout(() => {
          const el = document.getElementById(tab);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 60);
      }
    }
  };

  return (
    <div className="bg-grain" style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Y2K Ambient Vector Background Decorations */}
      <Y2KBackground />

      {/* Sticky Navigation Header */}
      <Navbar activeTab={activeTab} onNavigate={navigateTo} />

      {/* Main Page Content */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {activeTab === 'lab' ? (
          <LabPage onBackToHome={() => navigateTo('home')} />
        ) : (
          <>
            <div id="home">
              <HeroSection
                onNavigateToLab={() => navigateTo('lab')}
                onNavigateToProjects={() => navigateTo('projects')}
              />
            </div>

            <MarqueeBanner />
            <ProjectsSection />
            <MarqueeBanner />
            <SkillsSection />
            <MarqueeBanner />
            <ExperienceSection />
            <MarqueeBanner />
            <ContactSection />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
