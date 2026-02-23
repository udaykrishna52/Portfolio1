import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '16px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,5,10,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', letterSpacing: '2px' }}>
        <span style={{ color: 'var(--accent)' }}>&lt;</span>
        <span style={{ color: 'var(--text)', fontWeight: 700 }}>UKS</span>
        <span style={{ color: 'var(--accent)' }}>/&gt;</span>
      </div>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--text2)',
              letterSpacing: '1px',
              transition: 'color 0.2s',
              position: 'relative',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#chat"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--bg)',
            background: 'var(--accent)',
            padding: '8px 20px',
            borderRadius: '2px',
            letterSpacing: '1px',
            fontWeight: 700,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent3)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)'; }}
        >
          ASK AI
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
