import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';


export const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="cta-section">
      <div className="cta-bg-glow"></div>
      <div className="container">
        <motion.div 
          className="cta-card glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-badge">
            <ShieldCheck size={16} />
            {t.cta.badge}
          </div>

          <h2 className="cta-title">{t.cta.title}</h2>
          <p className="cta-subtitle">{t.cta.subtitle}</p>

          <a href="#contact" className="btn-primary cta-btn">
            {t.cta.button} <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};