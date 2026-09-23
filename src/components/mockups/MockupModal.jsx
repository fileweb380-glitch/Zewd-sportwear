import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

export const MockupModal = ({ item, phone, onClose, onPrev, onNext }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="zewd-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="zewd-modal-container"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="zewd-modal-close-btn"
            aria-label={t('close')}
            type="button"
          >
            <X size={24} />
          </button>

          <div className="zewd-modal-body">
            <div className="zewd-modal-media">
              <button
                onClick={onPrev}
                className="zewd-modal-nav prev"
                aria-label={t('prev')}
                type="button"
              >
                <ChevronLeft size={24} />
              </button>
              
              <img
                src={item.image}
                alt={t(item.nameKey)}
                className="zewd-modal-img"
              />

              <button
                onClick={onNext}
                className="zewd-modal-nav next"
                aria-label={t('next')}
                type="button"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="zewd-modal-details">
              <span className="zewd-card-category">
                {t(`${item.category}`)}
              </span>
              <h2 className="zewd-modal-title">{t(item.nameKey)}</h2>
              <p className="zewd-modal-desc">{t(item.descKey)}</p>

              {phone ? (
                <a href={`tel:${phone}`} className="zewd-modal-call-btn">
                  <Phone size={18} />
                  <span>{t('Call to Action')}</span>
                </a>
              ) : (
                <a href="#contact" onClick={onClose} className="zewd-modal-call-btn">
                  <Phone size={18} />
                  <span>{t('Call to Action')}</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};