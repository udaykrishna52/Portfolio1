import React from 'react';

const skillData = [
  {
    category: 'Languages',
    icon: '{ }',
    color: 'var(--accent)',
    items: ['Python', 'Java', 'C', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Web Technologies',
    icon: '</>',
    color: 'var(--accent2)',
    items: ['React', 'React Native', 'Next.js', 'HTML5', 'CSS3', 'Node.js'],
  },
  {
    category: 'Backend & DB',
    icon: '⚙',
    color: 'var(--accent3)',
    items: ['Django', 'Spring Boot', 'Express.js', 'MongoDB', 'MySQL'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁',
    color: '#f59e0b',
    items: ['AWS', 'IAM', 'Lambda', 'DynamoDB', 'S3', 'API Gateway', 'GitHub'],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" style={{
      padding: '120px 40px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '16px' }}>
            02. SKILLS
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1,
            color: 'var(--text)',
          }}>
            TECHNICAL<br />
            <span style={{ color: 'var(--accent2)' }}>EXPERTISE</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2px',
          background: 'var(--border)',
        }}>
          {skillData.map((skill, i) => (
            <div
              key={skill.category}
              style={{
                background: 'var(--bg2)',
                padding: '40px',
                transition: 'background 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg2)';
              }}
            >
              {/* Hover line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: skill.color,
              }} />

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '28px',
                color: skill.color,
                marginBottom: '16px',
                opacity: 0.8,
              }}>
                {skill.icon}
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--text)',
                letterSpacing: '2px',
                marginBottom: '24px',
              }}>
                {skill.category.toUpperCase()}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skill.items.map(item => (
                  <span
                    key={item}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text2)',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${skill.color}30`,
                      padding: '4px 10px',
                      borderRadius: '2px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '32px' }}>
            CERTIFICATIONS
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { name: 'AWS Certified Cloud Practitioner', date: 'Jun 2024–27', color: '#f59e0b', code: 'CLF-C02' },
              { name: 'Red Hat Enterprise App Developer', date: 'Dec 2024', color: '#e11d48', code: '240-195-867' },
              { name: 'Salesforce AI Associate', date: 'Oct 2024', color: '#0284c7', code: 'SF-AI' },
            ].map(cert => (
              <div
                key={cert.name}
                style={{
                  background: 'var(--bg2)',
                  border: `1px solid ${cert.color}30`,
                  padding: '20px 28px',
                  borderRadius: '2px',
                  flex: '1',
                  minWidth: '240px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  background: cert.color,
                }} />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--text)', marginBottom: '6px' }}>
                  {cert.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '1px' }}>
                  {cert.code} · {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
