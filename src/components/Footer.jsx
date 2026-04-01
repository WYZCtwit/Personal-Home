import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="section-container">
        <motion.div
          className="footer-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="footer-cta__label">Want to work together?</span>
          <h2 className="footer-cta__title">
            Let's <span className="footer-cta__accent">Talk</span>.
          </h2>
          <a href="mailto:WYZCtwit@outlook.com" className="footer-cta__btn">
            <Mail size={16} />
            <span>WYZCtwit@outlook.com</span>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <div className="footer-bottom">
          <div className="footer-bottom__left">
            <span className="footer-logo">
              <span className="footer-logo__mark">C</span>
              Charlotte
            </span>
          </div>
          <div className="footer-bottom__right">
            <span className="footer-copyright">
              © {new Date().getFullYear()} 夏尔 — Built with vibe-coding
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
