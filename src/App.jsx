import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import ToolsSection from './components/ToolsSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#08080a' : '#f5f0e8';
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`app-root ${theme === 'light' ? 'theme-light' : ''}`}>
      <div className="grain-overlay" />

      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className="main-content">
        <Hero />
        <MarqueeStrip />
        <ToolsSection />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
