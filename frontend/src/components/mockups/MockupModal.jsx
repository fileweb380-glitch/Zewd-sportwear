
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Phone
} from 'lucide-react';

import getImageUrl from '../../utils/imageUrl';

export const MockupModal = ({
  item,
  phone,
  onClose,
  onPrev,
  onNext
}) => {
  const { t } = useTranslation();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  useEffect(() => {
    setSelectedImgIndex(0);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  const displayTitle = item.nameKey
    ? t(item.nameKey)
    : (item.name || item.title || '');

  const displayDesc = item.descKey
    ? t(item.descKey)
    : (item.description || '');

  const rawGalleryImages =
    Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : item.image
        ? [item.image]
        : [];

  const galleryImages = rawGalleryImages
    .map((img) => {
      const imageUrl = typeof img === 'string' ? img : img?.url;
      return imageUrl ? getImageUrl(imageUrl) : '';
    })
    .filter(Boolean);

  const activeImage =
    galleryImages[selectedImgIndex] ||
    galleryImages[0] ||
    '';

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
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="zewd-modal-close-btn"
            aria-label={t('close')}
            type="button"
          >
            <X size={24} />
          </button>

          <div className="zewd-modal-body">

            {/* IMAGE GALLERY */}
            <div className="zewd-modal-media">

              <button
                onClick={onPrev}
                className="zewd-modal-nav prev"
                aria-label={t('prev')}
                type="button"
              >
                <ChevronLeft size={24} />
              </button>

              {activeImage && (
                <img
                  src={activeImage}
                  alt={displayTitle}
                  className="zewd-modal-img"
                />
              )}

              <button
                onClick={onNext}
                className="zewd-modal-nav next"
                aria-label={t('next')}
                type="button"
              >
                <ChevronRight size={24} />
              </button>

              {/* THUMBNAILS */}
              {galleryImages.length > 1 && (
                <div
                  className="zewd-modal-thumbs"
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '10px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImgIndex(idx)}
                      style={{
                        border: idx === selectedImgIndex
                          ? '2px solid #2563eb'
                          : '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: 0,
                        overflow: 'hidden',
                        width: '48px',
                        height: '48px',
                        cursor: 'pointer',
                        background: 'transparent'
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* PRODUCT DETAILS */}
            <div className="zewd-modal-details">

              <span className="zewd-card-category">
                {t(`${item.category || ''}`)}
              </span>

              <h2 className="zewd-modal-title">
                {displayTitle}
              </h2>

              <p className="zewd-modal-desc">
                {displayDesc}
              </p>

              {item.price !== undefined && item.price !== null && (
                <p className="zewd-modal-price">
                  <strong>{t('Price')}:</strong>{' '}
                  {item.currency || 'ETB'}{' '}
                  {Number(item.price).toFixed(2)}
                </p>
              )}

              {Array.isArray(item.sizes) && item.sizes.length > 0 && (
                <p className="zewd-modal-sizes">
                  <strong>{t('Sizes')}:</strong>{' '}
                  {item.sizes.join(', ')}
                </p>
              )}

              {item.stockStatus && (
                <p className="zewd-modal-stock">
                  <strong>{t('Availability')}:</strong>{' '}
                  {t(item.stockStatus)}
                </p>
              )}

              {/* CONTACT BUTTON */}
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className="zewd-modal-call-btn"
                >
                  <Phone size={18} />
                  <span>{t('Call to Action')}</span>
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={onClose}
                  className="zewd-modal-call-btn"
                >
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
