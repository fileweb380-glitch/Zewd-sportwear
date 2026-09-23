import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Palette, Zap, Printer, Clock, Activity, Headphones } from 'lucide-react';


export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const featureIcons = [Palette, Zap, Printer, Clock, Activity, Headphones];

  return (
    <section id="why-us" className="why-section section-padding">
      <div className="container">
        <div className="why-header text-center">
          <div className="section-badge">
            <span className="badge-dot"></span>
            {t.whyUs.badge}
          </div>
          <h2 className="section-title">{t.whyUs.title}</h2>
          <p className="section-subtitle">{t.whyUs.subtitle}</p>
        </div>

        <div className="why-grid">
          {t.whyUs.features.map((feature, idx) => {
            const IconComp = featureIcons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="why-card glass-panel glass-panel-hover"
              >
                <div className="why-icon-box">
                  <IconComp size={26} />
                </div>
                <h3 className="why-card-title">{feature.title}</h3>
                <p className="why-card-desc">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};