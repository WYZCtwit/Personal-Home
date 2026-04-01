import React from 'react';
import './MarqueeStrip.css';

const phrases = [
  'VIBE CODING',
  'PROMPT DRIVEN',
  'AI NATIVE',
  'INSIGHT ANALYZER',
  'DEEP WATER LOGIC',
  'CODE AESTHETICS',
  'MVP IN DAYS',
  'ZERO WASTE'
];

export default function MarqueeStrip() {
  return (
    <section className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-content">
          {[...phrases, ...phrases].map((phrase, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-text">{phrase}</span>
              <span className="marquee-sep">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
