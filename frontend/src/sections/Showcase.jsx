import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';


export const Showcase = () => {
  const { t } = useLanguage();

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1000&auto=format&fit=crop",
      title: "Championship Red Kit",
      size: "large"
    },
    {
      url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
      title: "Matchball & Apparel",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop",
      title: "Pro Matchday Kit",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
      title: "Custom Sublimation",
      size: "large"
    }
  ];

  return (
    <section id="gallery" className="showcase-section section-padding">
      <div className="container">
        <div className="showcase-header text-center">
          <div className="section-badge">
            <span className="badge-dot"></span>
            {t.showcase.badge}
          </div>
          <h2 className="section-title">{t.showcase.title}</h2>
          <p className="section-subtitle">{t.showcase.subtitle}</p>
        </div>

        <div className="gallery-masonry">
          {galleryImages.map((img, idx) => (
            <motion.div 
              key={idx}
              className={`gallery-item ${img.size}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <img src={img.url} alt={img.title} className="gallery-img" />
              <div className="gallery-overlay">
                <span className="gallery-title">{img.title}</span>
                <span className="gallery-tag">ZEWD CREATIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};