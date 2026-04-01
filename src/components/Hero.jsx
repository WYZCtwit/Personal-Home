import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import EyeCard from './EyeCard';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const titleChars = "I'm 夏尔.".split('');

  return (
    <section className="hero-section" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="hero-glow hero-glow--primary" />
      <div className="hero-glow hero-glow--secondary" />

      <motion.div className="hero-inner" style={{ opacity, y, scale }}>
        {/* Top navigation strip */}
        <motion.nav
          className="hero-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="nav-logo">
            <span className="logo-mark">C</span>
            <span className="logo-text">CHARLOTTE</span>
          </div>
          <div className="nav-status">
            <span className="status-dot" />
            <span className="status-text">Available for collaboration</span>
          </div>
        </motion.nav>

        {/* Main hero content */}
        <div className="hero-content">
          <div className="hero-left">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="badge-index">01</span>
              <span className="badge-divider" />
              <span className="badge-text">AI Product Manager</span>
            </motion.div>

            <h1 className="hero-title">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  className={char === '夏' || char === '尔' ? 'title-chinese' : 'title-char'}
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <span className="subtitle-line" />
              <p className="subtitle-text">
                业务逻辑的拆解者，AI 原生开发的信徒
              </p>
            </motion.div>

            <motion.p
              className="hero-bio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              擅长在深水区洞察用户伪命题，通过 <strong>Vibe-coding</strong> 缩短从 Idea 到 MVP 的距离。
              拒绝冗长文档，主张以 Prompt 驱动逻辑，让复杂业务在代码美学中即刻着陆。
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <a href="mailto:WYZCtwit@outlook.com" className="btn-cta">
                <Mail size={16} />
                <span>Get in Touch</span>
                <span className="btn-arrow">→</span>
              </a>
              <a href="#projects" className="btn-ghost">
                <span>View Projects</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-card-wrapper">
              <div className="card-glow" />
              <EyeCard />
              <div className="card-label-bottom">
                <span className="card-label-text">INSIGHT ENGINE v1.0</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
