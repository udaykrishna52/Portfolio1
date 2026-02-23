import React, { useState } from 'react';

const projectsData = [
  {
    number: '01',
    title: 'E-Commerce Supply Chain',
    subtitle: 'Management System',
    tech: ['Python', 'Django', 'MySQL', 'REST API'],
    color: 'var(--accent3)',
    description: 'Full-stack supply chain management platform with automated supplier notifications, reducing shipment delays by 20%. Integrated secure payment gateways and optimized database performance for high-volume transactions.',
    highlights: [
      '20% reduction in shipment delays',
      'Automated supplier notifications',
      'Secure payment gateway integration',
      'Optimized database architecture',
    ],
  },
  {
    number: '02',
    title: 'Online Voting System',
    subtitle: 'Secure MERN Platform',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT'],
    color: 'var(--accent)',
    description: 'Secure blockchain-inspired voting platform built on the MERN stack ensuring fair and transparent elections. Features JWT authentication, role-based access control with 3 distinct user tiers, and end-to-end encryption.',
    highlights: [
      'JWT auth + data encryption',
      '3-tier role-based access control',
      'Transparent election mechanism',
      'Prevention of unauthorized manipulation',
    ],
  },
  {
    number: '03',
    title: 'Certification Tracker',
    subtitle: 'Full-Stack Management System',
    tech: ['Java', 'Spring Boot', 'React.js', 'REST API', 'MySQL'],
    color: 'var(--accent2)',
    description: 'Scalable full-stack credential management system with Spring Boot backend and React.js frontend. Automated certificate verification pipeline with a secure, scalable database schema for efficient storage and retrieval.',
    highlights: [
      'Automated certificate verification',
      'Spring Boot + React.js full stack',
      'Scalable database schema design',
      'Seamless credential management',
    ],
  },
];

const Projects: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="projects" style={{
      padding: '120px 40px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '16px' }}>
            03. PROJECTS
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1,
          }}>
            WHAT I'VE<br />
            <span style={{ color: 'var(--accent)' }}>BUILT</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'var(--border)' }}>
          {/* Project list */}
          <div style={{ background: 'var(--bg)' }}>
            {projectsData.map((project, i) => (
              <div
                key={project.number}
                onClick={() => setActive(i)}
                style={{
                  padding: '40px',
                  cursor: 'pointer',
                  background: active === i ? 'var(--bg3)' : 'transparent',
                  borderLeft: active === i ? `3px solid ${project.color}` : '3px solid transparent',
                  transition: 'all 0.2s',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: active === i ? project.color : 'var(--text3)',
                  letterSpacing: '3px',
                  marginBottom: '8px',
                  transition: 'color 0.2s',
                }}>
                  {project.number}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: active === i ? 'var(--text)' : 'var(--text2)',
                  lineHeight: 1.2,
                  marginBottom: '4px',
                  transition: 'color 0.2s',
                }}>
                  {project.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  color: 'var(--text3)',
                  marginBottom: '16px',
                }}>
                  {project.subtitle}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: active === i ? project.color : 'var(--text3)',
                      background: active === i ? `${project.color}15` : 'transparent',
                      border: `1px solid ${active === i ? project.color + '40' : 'rgba(255,255,255,0.1)'}`,
                      padding: '2px 8px',
                      borderRadius: '2px',
                      transition: 'all 0.2s',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Project detail */}
          <div style={{
            background: 'var(--bg2)',
            padding: '48px',
            position: 'sticky',
            top: '80px',
            alignSelf: 'start',
          }}>
            {(() => {
              const p = projectsData[active];
              return (
                <>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '72px',
                    fontWeight: 700,
                    color: `${p.color}15`,
                    lineHeight: 1,
                    marginBottom: '-20px',
                    userSelect: 'none',
                  }}>
                    {p.number}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '28px',
                    color: 'var(--text)',
                    marginBottom: '8px',
                    lineHeight: 1.2,
                  }}>
                    {p.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: p.color,
                    letterSpacing: '2px',
                    marginBottom: '24px',
                  }}>
                    {p.subtitle.toUpperCase()}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    color: 'var(--text2)',
                    lineHeight: 1.8,
                    marginBottom: '32px',
                  }}>
                    {p.description}
                  </p>
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '16px' }}>
                      KEY HIGHLIGHTS
                    </div>
                    {p.highlights.map((h, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '10px',
                      }}>
                        <span style={{ color: p.color, fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--text2)' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: p.color,
                        background: `${p.color}10`,
                        border: `1px solid ${p.color}30`,
                        padding: '4px 12px',
                        borderRadius: '2px',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
