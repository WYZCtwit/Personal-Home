import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 2.5, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Grid lines */}
      <div className="loading-grid-overlay" />

      {/* Center content */}
      <motion.div
        className="loading-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="loading-badge"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="loading-badge__dot" />
          SYSTEM LOADING
        </motion.span>

        <h1 className="loading-title">
          洞察<span className="loading-title__accent">与</span>重组
        </h1>

        <div className="loading-bar">
          <motion.div
            className="loading-bar__fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, delay: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <motion.span
          className="loading-version"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          v2.0 — EDITORIAL EDITION
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
