import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { LabPage } from './components/LabPage';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'lab') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-grain" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={navigateTo} />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        {activeTab === 'lab' ? (
          <LabPage />
        ) : (
          <>
            <div id="home">
              <HeroSection
                onNavigateToLab={() => navigateTo('lab')}
                onNavigateToProjects={() => navigateTo('projects')}
              />
            </div>

            <ProjectsSection />
            <SkillsSection />
            <ExperienceSection />
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
