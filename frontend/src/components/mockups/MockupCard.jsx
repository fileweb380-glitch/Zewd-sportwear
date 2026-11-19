import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export const MockupCard = ({ item, onSelect }) => {
  const { t } = useTranslation();

  const displayTitle = item.nameKey ? t(item.nameKey) : (item.name || item.title || '');
  const displayDesc = item.descKey ? t(item.descKey) : (item.description || '');
  const displayImage =
    item.image ||
    (Array.isArray(item.images) &&
      (typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url)) ||
    '';

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
        {displayImage && (
          <img
            src={displayImage}
            alt={displayTitle}
            className="zewd-card-img"
            loading="lazy"
          />
        )}
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
          {t(`${item.category || ''}`)}
        </span>
        <h3 className="zewd-card-title">{displayTitle}</h3>
        <p className="zewd-card-desc">{displayDesc}</p>
        {item.price !== undefined && item.price !== null && (
          <p className="zewd-card-price">${Number(item.price).toFixed(2)}</p>
        )}
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