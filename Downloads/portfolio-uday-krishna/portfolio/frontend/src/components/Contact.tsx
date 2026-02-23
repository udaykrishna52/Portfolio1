import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" style={{ padding: '120px 40px 60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '16px' }}>
            06. CONTACT
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1,
            marginBottom: '24px',
          }}>
            LET'S<br />
            <span style={{ color: 'var(--accent2)' }}>CONNECT</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--text2)', maxWidth: '500px', margin: '0 auto' }}>
            Open to internships, full-time roles, and exciting collaborations. Let's build something great.
          </p>
        </div>

        {/* Contact grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: 'var(--border)', marginBottom: '60px' }}>
          {[
            {
              icon: '✉',
              label: 'Email',
              value: 'udaykrishnaseetha2004@gmail.com',
              href: 'mailto:udaykrishnaseetha2004@gmail.com',
              color: 'var(--accent)',
            },
            {
              icon: '📱',
              label: 'Phone',
              value: '+91 8688797070',
              href: 'tel:+918688797070',
              color: 'var(--accent3)',
            },
            {
              icon: '📍',
              label: 'Location',
              value: 'Macherla, Andhra Pradesh',
              href: '#',
              color: 'var(--accent2)',
            },
            {
              icon: '🎓',
              label: 'University',
              value: 'KL University, AP',
              href: '#',
              color: '#f59e0b',
            },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              style={{
                background: 'var(--bg2)',
                padding: '36px',
                display: 'block',
                textDecoration: 'none',
                transition: 'background 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'; }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: item.color, opacity: 0.6 }} />
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '2px', marginBottom: '6px' }}>
                {item.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--text2)', wordBreak: 'break-all' }}>
                {item.value}
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', letterSpacing: '2px' }}>
            <span style={{ color: 'var(--accent)' }}>&lt;</span>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>UKS</span>
            <span style={{ color: 'var(--accent)' }}>/&gt;</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '1px' }}>
            © 2025 Uday Krishna Seetha · Built with React + Python
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent3)', animation: 'pulse-glow 2s infinite' }} />
            AVAILABLE FOR HIRE
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
