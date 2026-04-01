import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Terminal, Bot, X } from 'lucide-react';
import './ToolsSection.css';

const FigmaIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
  </svg>
);

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.12-.34 6.4-1.51 6.4-6.98a5.1 5.1 0 0 0-1.5-3.83 4.8 4.8 0 0 0-.1-3.8s-1.2-.38-3.9 1.4a13.4 13.4 0 0 0-7 0c-2.7-1.78-3.9-1.4-3.9-1.4a4.8 4.8 0 0 0-.1 3.8 5.1 5.1 0 0 0-1.5 3.82c0 5.46 3.28 6.64 6.4 6.98A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const defaultTools = [
  { id: 1, name: 'ChatGPT', icon: <Bot size={24} />, color: '#10a37f', url: 'https://chat.openai.com' },
  { id: 2, name: 'Claude', icon: <div style={{fontWeight: 700, fontSize: '1.1rem', fontFamily: 'var(--font-display)'}}>C</div>, color: '#d97757', url: 'https://claude.ai' },
  { id: 3, name: 'Figma', icon: <FigmaIcon size={24} />, color: '#f24e1e', url: 'https://figma.com' },
  { id: 4, name: 'GitHub', icon: <GithubIcon size={24} />, color: '#f0ece4', url: 'https://github.com' },
  { id: 5, name: '终端记录', icon: <Terminal size={24} />, color: '#8a8680', url: '#' },
];

export default function ToolsSection() {
  const [customTools, setCustomTools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShortcutName, setNewShortcutName] = useState('');
  const [newShortcutUrl, setNewShortcutUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('customTools');
    if (saved) {
      try { setCustomTools(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  const saveCustomTools = (tools) => {
    setCustomTools(tools);
    localStorage.setItem('customTools', JSON.stringify(tools));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newShortcutName || !newShortcutUrl) return;

    let finalUrl = newShortcutUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const accentColors = ['#e8b931', '#d97757', '#10a37f', '#f24e1e', '#4ade80', '#f0d060', '#f97316'];
    const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)];

    const newTool = {
      id: `custom-${Date.now()}`,
      name: newShortcutName,
      url: finalUrl,
      isCustom: true,
      color: randomColor,
      iconChar: newShortcutName.charAt(0).toUpperCase(),
    };

    saveCustomTools([...customTools, newTool]);
    setNewShortcutName('');
    setNewShortcutUrl('');
    setIsModalOpen(false);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    saveCustomTools(customTools.filter(t => t.id !== id));
  };

  const allTools = [...defaultTools, ...customTools];

  return (
    <section className="tools-section" id="tools">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">02 — 常用工具</div>
        </motion.div>

        <div className="tools-grid">
          {allTools.map((tool, idx) => (
            <motion.a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="tool-card__icon" style={{ color: tool.color }}>
                {tool.isCustom && tool.iconChar ? (
                  <span className="tool-card__char">{tool.iconChar}</span>
                ) : tool.icon}
              </div>
              <span className="tool-card__name">{tool.name}</span>
              <div className="tool-card__line" style={{ background: tool.color }} />

              {tool.isCustom && (
                <button className="tool-card__delete" onClick={(e) => handleDelete(e, tool.id)}>
                  <X size={10} />
                </button>
              )}
            </motion.a>
          ))}

          <motion.button
            className="tool-card tool-card--add card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: allTools.length * 0.06 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={24} strokeWidth={1.5} />
            <span className="tool-card__name">添加</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="modal-content card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">添加快捷方式</h3>
              <form onSubmit={handleAddSubmit}>
                <div className="form-group">
                  <label>名称</label>
                  <input
                    type="text"
                    value={newShortcutName}
                    onChange={(e) => setNewShortcutName(e.target.value)}
                    placeholder="例如：Google"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label>网址</label>
                  <input
                    type="text"
                    value={newShortcutUrl}
                    onChange={(e) => setNewShortcutUrl(e.target.value)}
                    placeholder="例如：www.google.com"
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>取消</button>
                  <button type="submit" className="btn-submit" disabled={!newShortcutName || !newShortcutUrl}>完成</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
