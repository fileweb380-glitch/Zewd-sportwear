import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, CheckCircle2, Factory } from 'lucide-react';


export const About = () => {
  const { t } = useLanguage();

  const icons = [Factory, Cpu, CheckCircle2];

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-image-stage"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-wrapper glass-panel">
              <img 
                src="/photo_2026-09-16_12-56-19.jpg" 
                alt="Zewd Manufacturing Facility" 
                className="about-img"
              />
              <div className="about-experience-badge">
                <span className="exp-num">ZEWD</span>
                <span className="exp-text">ETHIOPIA FABRICATION</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-badge">
              <span className="badge-dot"></span>
              {t.about.badge}
            </div>

            <h2 className="section-title">{t.about.title}</h2>
            
            <p className="about-text">{t.about.desc1}</p>
            <p className="about-text text-muted">{t.about.desc2}</p>

            <div className="about-pillars">
              {t.about.pillars.map((pillar, idx) => {
                const IconComponent = icons[idx];
                return (
                  <div key={idx} className="pillar-item glass-panel">
                    <div className="pillar-icon">
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <h4 className="pillar-title">{pillar.title}</h4>
                      <p className="pillar-desc">{pillar.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};