import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './EyeCard.css';

export default function EyeCard() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerCenter, setContainerCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dx = mousePos.x - containerCenter.x;
  const dy = mousePos.y - containerCenter.y;
  const angle = Math.atan2(dy, dx);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const ratio = Math.min(distance * 0.05, 1);

  const maxR = { x: 14, y: 14 };
  const targetX = ratio * maxR.x * Math.cos(angle);
  const targetY = ratio * maxR.y * Math.sin(angle);

  const springX = useSpring(0, { stiffness: 400, damping: 30 });
  const springY = useSpring(0, { stiffness: 400, damping: 30 });

  useEffect(() => {
    springX.set(targetX);
    springY.set(targetY);
  }, [targetX, targetY, springX, springY]);

  const parallaxX = targetX * 0.4;
  const parallaxY = targetY * 0.4;

  const tiltX = useSpring(0, { stiffness: 200, damping: 40 });
  const tiltY = useSpring(0, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const cardRotateX = -(dy / window.innerHeight) * 15;
    const cardRotateY = (dx / window.innerWidth) * 15;
    tiltX.set(cardRotateX);
    tiltY.set(cardRotateY);
  }, [dx, dy, tiltX, tiltY]);

  return (
    <motion.div
      className="eye-card"
      ref={containerRef}
      style={{ rotateX: tiltX, rotateY: tiltY, perspective: 1000 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="eye-card__inner">
        <div className="eye-card__label">
          <span className="eye-card__label-dot" />
          INSIGHT
        </div>

        <div className="eye-card__sclera" style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}>
          <motion.div className="eye-card__iris" style={{ x: springX, y: springY }}>
            <div className="eye-card__pupil">
              <div className="eye-card__flare" />
            </div>
          </motion.div>
        </div>

        <div className="eye-card__desc">洞察用户伪命题</div>

        {/* Corner decorations */}
        <div className="eye-card__corner eye-card__corner--tl" />
        <div className="eye-card__corner eye-card__corner--br" />
      </div>
    </motion.div>
  );
}
