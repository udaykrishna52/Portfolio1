import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';

const suggestedQuestions = [
  "What are Uday's main skills?",
  "Tell me about the voting system project",
  "What certifications does he have?",
  "What's his CGPA and university?",
  "What cloud technologies does he know?",
  "Is he available for work?",
];

const ChatSection: React.FC = () => {
  const { messages, loading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="chat" style={{
      padding: '120px 40px',
      position: 'relative',
      background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.03), transparent)',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '-200px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '16px' }}>
            05. AI ASSISTANT
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1,
            marginBottom: '16px',
          }}>
            ASK ME<br />
            <span style={{ color: 'var(--accent)' }}>ANYTHING</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--text2)', maxWidth: '500px', margin: '0 auto' }}>
            Powered by AI — ask about my skills, projects, experience, or anything on my resume.
          </p>
        </div>

        {/* Chat container */}
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(0,212,255,0.05)',
        }}>
          {/* Chat header bar */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text3)', flex: 1, textAlign: 'center', letterSpacing: '2px' }}>
              UDAY_AI_ASSISTANT.exe
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--accent3)',
              letterSpacing: '1px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent3)', animation: 'pulse-glow 2s infinite' }} />
              ONLINE
            </div>
          </div>

          {/* Messages area */}
          <div style={{
            height: '420px',
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeInUp 0.3s ease',
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '2px',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'white',
                    flexShrink: 0,
                    marginRight: '10px',
                    marginTop: '2px',
                  }}>
                    AI
                  </div>
                )}
                <div style={{
                  maxWidth: '75%',
                  padding: '14px 18px',
                  borderRadius: '4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, var(--accent2), var(--accent))'
                    : 'var(--bg3)',
                  border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  fontFamily: msg.role === 'assistant' ? 'var(--font-display)' : 'var(--font-display)',
                  fontSize: '14px',
                  color: msg.role === 'user' ? 'white' : 'var(--text2)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '2px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text3)',
                    flexShrink: 0,
                    marginLeft: '10px',
                    marginTop: '2px',
                  }}>
                    YOU
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 0.3s ease' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '2px',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0,
                }}>
                  AI
                </div>
                <div style={{
                  padding: '14px 18px',
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      animation: `blink 1s ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length < 3 && (
            <div style={{
              padding: '12px 24px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              background: 'rgba(0,0,0,0.2)',
            }}>
              {suggestedQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    background: 'rgba(0,212,255,0.05)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.5px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget).style.background = 'rgba(0,212,255,0.15)';
                    (e.currentTarget).style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget).style.background = 'rgba(0,212,255,0.05)';
                    (e.currentTarget).style.borderColor = 'rgba(0,212,255,0.2)';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end',
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Uday's skills, projects, or experience..."
              rows={1}
              style={{
                flex: 1,
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '12px 16px',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--text)',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.5,
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              style={{
                background: !input.trim() || loading ? 'var(--bg3)' : 'var(--accent)',
                border: `1px solid ${!input.trim() || loading ? 'var(--border)' : 'var(--accent)'}`,
                color: !input.trim() || loading ? 'var(--text3)' : 'var(--bg)',
                padding: '12px 20px',
                borderRadius: '2px',
                cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1px',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              SEND →
            </button>
          </div>
        </div>

        {/* Model info */}
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text3)',
          letterSpacing: '1px',
        }}>
          Powered by OpenRouter API · Resume-aware AI · Press Enter to send
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
