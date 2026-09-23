import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export const MockupCard = ({ item, onSelect }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="zewd-mockup-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <div className="zewd-card-image-wrap">
        <img
          src={item.image}
          alt={t(item.nameKey)}
          className="zewd-card-img"
          loading="lazy"
        />
        <div className="zewd-card-overlay">
          <button
            onClick={() => onSelect(item)}
            className="zewd-btn-overlay"
            type="button"
          >
            <Eye size={18} />
            <span>{t('View detail')}</span>
          </button>
        </div>
      </div>

      <div className="zewd-card-content">
        <span className="zewd-card-category">
          {t(`${item.category}`)}
        </span>
        <h3 className="zewd-card-title">{t(item.nameKey)}</h3>
        <p className="zewd-card-desc">{t(item.descKey)}</p>
        <button
          onClick={() => onSelect(item)}
          className="zewd-card-action-btn"
          type="button"
        >
          {t('View detail')}
        </button>
      </div>
    </motion.div>
  );
};