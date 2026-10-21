import React, { useState } from 'react';
import { Activity, ShieldCheck, Sparkles, Terminal, FolderGit2, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { PROJECTS, type Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { soundEngine } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Web Apps', 'Creative Tech'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Activity': return <Activity size={24} color="var(--color-old-rose)" />;
      case 'ShieldCheck': return <ShieldCheck size={24} color="var(--color-old-rose)" />;
      case 'Sparkles': return <Sparkles size={24} color="var(--color-old-rose)" />;
      case 'Terminal': return <Terminal size={24} color="var(--color-old-rose)" />;
      case 'FolderGit2': return <FolderGit2 size={24} color="var(--color-old-rose)" />;
      case 'Lock': return <Lock size={24} color="var(--color-old-rose)" />;
      default: return <Activity size={24} color="var(--color-old-rose)" />;
    }
  };

  const handleOpenModal = (project: Project) => {
    soundEngine.playSparkle();
    setActiveModalProject(project);
  };

  return (
    <section id="projects" style={{
      padding: '64px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span className="retro-pill">
            <Sparkles size={12} color="var(--color-old-rose)" /> Systems &amp; Web Engineering
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
          Projects, experiments &amp; happy accidents
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-taupe-grey)', fontSize: '1.05rem' }}>
          A collection of projects, experiments, and ideas I've brought to life with code. From little automation tools to interactive games, this is where my technical side meets my creative one.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '40px',
      }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick(650, 0.04);
                setSelectedCategory(cat);
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9rem',
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-taupe-grey)',
                backgroundColor: isActive ? 'var(--color-old-rose)' : 'var(--color-pale-slate)',
                color: isActive ? 'var(--color-soft-blush)' : 'var(--color-taupe-grey)',
                boxShadow: isActive ? '3px 3px 0px var(--color-taupe-grey)' : '2px 2px 0px var(--color-taupe-grey)',
                transform: isActive ? 'translate(-1px, -1px)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="retro-box"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-pale-slate)',
            }}
          >
            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-soft-blush)',
                  border: '2px solid var(--color-taupe-grey)',
                  boxShadow: '2px 2px 0px var(--color-taupe-grey)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {renderIcon(project.iconName)}
                </div>
                <span className="retro-pill" style={{ backgroundColor: 'var(--color-soft-blush)', fontSize: '0.72rem' }}>
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-taupe-grey)' }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: '0.92rem',
                color: 'var(--color-taupe-grey)',
                marginBottom: '14px',
                lineHeight: 1.55
              }}>
                {project.description}
              </p>

              {/* Metrics Badge */}
              <div style={{
                backgroundColor: 'rgba(255, 219, 218, 0.7)',
                border: '1.5px dashed var(--color-taupe-grey)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-taupe-grey)',
                marginBottom: '16px',
                display: 'inline-block',
              }}>
                ⚡ {project.metrics}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-soft-blush)',
                      border: '1px solid var(--color-taupe-grey)',
                      color: 'var(--color-taupe-grey)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(96, 77, 83, 0.2)',
            }}>
              <button
                onClick={() => handleOpenModal(project)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: 'var(--color-taupe-grey)',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  padding: '4px 0',
                }}
              >
                <span>View Details</span>
                <ArrowRight size={15} color="var(--color-old-rose)" />
              </button>

              {(project.githubUrl || project.demoUrl) ? (
                <a
                  href={project.demoUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick(800, 0.04)}
                  title={project.demoUrl ? 'Play on itch.io' : 'View Source on GitHub'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-taupe-grey)',
                    textDecoration: 'none',
                  }}
                >
                  <span>{project.demoUrl ? 'Play ↗' : 'Code ↗'}</span>
                  <ExternalLink size={13} />
                </a>
              ) : null}
            </div>

          </div>
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
