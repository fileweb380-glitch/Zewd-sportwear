import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Trophy, Sparkles, ChevronDown } from 'lucide-react';


export const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  // 3D Perspective Transformations based on Scroll Physics
  const jerseyRotateX = useTransform(scrollY, [0, 500], [15, 0]);
  const jerseyRotateY = useTransform(scrollY, [0, 500], [-15, 25]);
  const jerseyScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section id="home" className="hero-section">
      {/* Background Lighting Spheres */}
      <div className="hero-glow hero-glow-red"></div>
      <div className="hero-glow hero-glow-green"></div>
      <div className="hero-grid-pattern"></div>

      <div className="container hero-container">
        <motion.div className="hero-content" style={{ y: heroY }}>
          <motion.div 
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-dot"></span>
            {t.hero.badge}
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>{t.hero.titleLine1}</span>
            <span className="hero-highlight">{t.hero.titleLine2}</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#contact" className="btn-primary">
              {t.hero.primaryCta} <ArrowRight size={18} />
            </a>
            <a href="#mockupshowcase" className="btn-secondary">
              {t.hero.secondaryCta}
            </a>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="stat-item">
              <span className="stat-number">{t.hero.stat1Number}</span>
              <span className="stat-label">{t.hero.stat1Label}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{t.hero.stat2Number}</span>
              <span className="stat-label">{t.hero.stat2Label}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{t.hero.stat3Number}</span>
              <span className="stat-label">{t.hero.stat3Label}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Visual Stage */}
        <div className="hero-visual-stage">
          <motion.div 
            className="card-3d-wrapper"
            style={{
              rotateX: jerseyRotateX,
              rotateY: jerseyRotateY,
              scale: jerseyScale,
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: -15 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="jersey-glass-card glass-panel">
              <div className="card-tag">
                <Trophy size={14} className="tag-icon" /> OFFICIAL KIT
              </div>

              {/* Mock Football Jersey Graphic */}
              <div className="jersey-render-container">
                <img 
                  src="/photo_2026-09-16_12-10-31.jpg" 
                  alt="Zewd Pro Kit Showcase" 
                  className="jersey-image"
                />
                <div className="jersey-overlay-shine"></div>
              </div>

              <div className="card-footer-info">
                <div className="kit-brand">
                  <Sparkles size={16} className="sparkle" />
                  <span>ZEWD HYPERFLEX™ FABRIC</span>
                </div>
                <div className="kit-price-tag">PRO GRADE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a href="#products" className="scroll-indicator" aria-label="Scroll Down">
        <ChevronDown size={24} />
      </a>
    </section>
  );
};