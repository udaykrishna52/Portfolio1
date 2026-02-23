import React, { useEffect, useRef, useState } from 'react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState(0);
  const phrases = ['Full Stack Developer', 'Cyber Security Enthusiast', 'Blockchain Explorer', 'Cloud Architect'];
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIndex.current];
      if (!deleting.current) {
        setDisplayText(current.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setDisplayText(current.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          deleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 50 : 80);
    };
    const timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPhase(1);
  }, []);

  return (
    <section id="about" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 40px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-100px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Geometric decoration */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '200px',
        height: '200px',
        border: '1px solid rgba(0,212,255,0.2)',
        transform: 'rotate(45deg)',
        animation: 'spin-slow 20s linear infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '18%',
        right: '13%',
        width: '140px',
        height: '140px',
        border: '1px solid rgba(124,58,237,0.2)',
        transform: 'rotate(45deg)',
        animation: 'spin-slow 15s linear infinite reverse',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(6,255,165,0.1)',
          border: '1px solid rgba(6,255,165,0.3)',
          borderRadius: '2px',
          marginBottom: '32px',
          opacity: phase ? 1 : 0,
          animation: phase ? 'fadeInUp 0.6s ease forwards' : 'none',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent3)',
            animation: 'pulse-glow 2s infinite',
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent3)', letterSpacing: '2px' }}>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(48px, 8vw, 96px)',
          lineHeight: 1,
          letterSpacing: '-2px',
          marginBottom: '8px',
          opacity: phase ? 1 : 0,
          animation: phase ? 'fadeInUp 0.6s ease 0.1s forwards' : 'none',
        }}>
          <span style={{ color: 'var(--text)' }}>UDAY</span>
        </h1>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(48px, 8vw, 96px)',
          lineHeight: 1,
          letterSpacing: '-2px',
          marginBottom: '32px',
          opacity: phase ? 1 : 0,
          animation: phase ? 'fadeInUp 0.6s ease 0.2s forwards' : 'none',
        }}>
          <span style={{
            background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>KRISHNA</span>
          <span style={{ color: 'var(--text)' }}> SEETHA</span>
        </h1>

        {/* Typewriter */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: 'var(--accent)',
          marginBottom: '24px',
          height: '30px',
          opacity: phase ? 1 : 0,
          animation: phase ? 'fadeInUp 0.6s ease 0.3s forwards' : 'none',
        }}>
          {displayText}
          <span style={{ animation: 'blink 1s infinite', marginLeft: '2px' }}>|</span>
        </div>

        {/* Bio */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '17px',
          color: 'var(--text2)',
          lineHeight: 1.8,
          maxWidth: '600px',
          marginBottom: '48px',
          opacity: phase ? 1 : 0,
          animation: phase ? 'fadeInUp 0.6s ease 0.4s forwards' : 'none',
        }}>
          B.Tech CSE student at <span style={{ color: 'var(--accent)' }}>KL University</span> with a 9.01 CGPA. 
          Building secure, scalable web applications with expertise in cloud computing, 
          blockchain technology, and full-stack development.
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '40px',
          marginBottom: '48px',
          flexWrap: 'wrap',
          opacity: phase ? 1 : 0,
          animation: phase ? 'fadeInUp 0.6s ease 0.5s forwards' : 'none',
        }}>
          {[
            { value: '9.01', label: 'CGPA' },
            { value: '3+', label: 'Projects' },
            { value: '3', label: 'Certifications' },
            { value: '10+', label: 'AWS Labs' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '2px', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          opacity: phase ? 1 : 0,
          animation: phase ? 'fadeInUp 0.6s ease 0.6s forwards' : 'none',
        }}>
          <a
            href="#projects"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '2px',
              padding: '14px 32px',
              background: 'var(--accent)',
              color: 'var(--bg)',
              borderRadius: '2px',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >
            VIEW PROJECTS →
          </a>
          <a
            href="#chat"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '2px',
              padding: '14px 32px',
              background: 'transparent',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              borderRadius: '2px',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >
            ASK AI ABOUT ME
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.5,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--text3)' }}>SCROLL</div>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scan 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
};

export default Hero;
