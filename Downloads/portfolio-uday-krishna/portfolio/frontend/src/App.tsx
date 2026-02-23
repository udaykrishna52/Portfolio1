import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ChatSection from './components/ChatSection';
import Contact from './components/Contact';
import './App.css';

function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div ref={cursorRef} className="cursor" />
      <div ref={cursorRingRef} className="cursor-ring" />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <ChatSection />
      <Contact />
    </div>
  );
}

export default App;
