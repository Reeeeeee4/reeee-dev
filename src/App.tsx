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
