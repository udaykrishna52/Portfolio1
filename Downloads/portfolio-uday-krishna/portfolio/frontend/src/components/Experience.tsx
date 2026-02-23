import React from 'react';

const Experience: React.FC = () => {
  return (
    <section id="experience" style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '16px' }}>
            04. EXPERIENCE
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1,
          }}>
            WORK &<br />
            <span style={{ color: 'var(--accent3)' }}>EDUCATION</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          {/* Experience */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              WORK EXPERIENCE
            </div>
            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '12px' }}>
                JAN – MAR 2024
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '4px' }}>
                Cloud Virtual Intern
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--accent2)', marginBottom: '20px' }}>
                AICTE EduSkills — AWS Academy Cohorts 8 & 9
              </div>
              {[
                'Completed 10+ AWS labs covering IAM, DynamoDB, Lambda, API Gateway, and S3',
                'Gained practical exposure to cloud computing fundamentals and data handling',
                'Worked on cloud-based simulations involving secure data flow, storage, and access management',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '3px', flexShrink: 0 }}>▸</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['AWS', 'IAM', 'Lambda', 'DynamoDB', 'S3', 'API Gateway'].map(t => (
                  <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#f59e0b', background: '#f59e0b15', border: '1px solid #f59e0b30', padding: '2px 8px', borderRadius: '2px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              EDUCATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  degree: 'B.Tech — Computer Science & Engineering',
                  institution: 'KL Deemed to be University',
                  period: 'Jul 2022 – Jun 2026',
                  score: '9.01 / 10',
                  color: 'var(--accent)',
                  note: 'Specializing in Cyber Security & Blockchain',
                },
                {
                  degree: 'Intermediate',
                  institution: 'Sri Chaitanya Junior College',
                  period: 'Jul 2020 – May 2022',
                  score: '8.9 / 10',
                  color: 'var(--accent2)',
                  note: '',
                },
                {
                  degree: 'SSC — 10th Standard',
                  institution: 'KrishnaVeni Talent School',
                  period: 'Jul 2019 – Apr 2020',
                  score: '10 / 10',
                  color: 'var(--accent3)',
                  note: 'Perfect score',
                },
              ].map((edu, i) => (
                <div key={i} style={{
                  background: 'var(--bg2)',
                  border: `1px solid ${edu.color}20`,
                  padding: '24px',
                  borderLeft: `3px solid ${edu.color}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: 'var(--text3)', marginBottom: '4px' }}>
                      {edu.institution}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '1px' }}>
                      {edu.period}
                    </div>
                    {edu.note && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: edu.color, marginTop: '6px', letterSpacing: '1px' }}>
                        {edu.note}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: edu.color }}>
                      {edu.score}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>
                      CGPA
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
