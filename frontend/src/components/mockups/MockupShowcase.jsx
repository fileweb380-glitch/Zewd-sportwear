
import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';

import { allMockups, ZEWD_PHONE } from '../../data/mockups';
import api from '../../services/api';
import getImageUrl from '../../utils/imageUrl';

import { MockupFilters } from './MockupFilters';
import { MockupCard } from './MockupCard';
import { MockupModal } from './MockupModal';

const normalizeCategory = (category) => {
  const value = String(category || '').trim().toLowerCase();

  if (value.includes('football')) return 'football';
  if (value.includes('basketball')) return 'basketball';
  if (value.includes('tennis')) return 'tennis';
  if (value.includes('gym')) return 'gym';

  return value;
};

const normalizeBackendProduct = (product) => {
  const imageList = Array.isArray(product.images)
    ? product.images
        .map((img) => (typeof img === 'string' ? img : img?.url))
        .filter(Boolean)
    : [];

  const resolvedImages = imageList.map((imageUrl) =>
    getImageUrl(imageUrl)
  );

  const fallbackImage = product.image
    ? getImageUrl(product.image)
    : '';

  return {
    ...product,
    id: product._id || product.id,
    title: product.title || product.name || '',
    name: product.name || product.title || '',
    category: normalizeCategory(product.category),
    image: resolvedImages[0] || fallbackImage,
    images: resolvedImages.length > 0
      ? resolvedImages
      : fallbackImage
        ? [fallbackImage]
        : [],
    rawImages: product.images || [],
  };
};

export const MockupShowcase = ({ phone = ZEWD_PHONE }) => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMockup, setSelectedMockup] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get('/products');

        const list = Array.isArray(res.data?.products)
          ? res.data.products
          : Array.isArray(res.data)
            ? res.data
            : [];

        if (isMounted) {
          setProducts(list.map(normalizeBackendProduct));
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
            'Failed to load products'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const showcaseItems = useMemo(() => {
    return products.length > 0 ? products : allMockups;
  }, [products]);

  const filteredMockups = useMemo(() => {
    if (activeCategory === 'all') {
      return showcaseItems;
    }

    return showcaseItems.filter((item) => {
      return normalizeCategory(item.category) === activeCategory;
    });
  }, [activeCategory, showcaseItems]);

  const total = filteredMockups.length;

  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [total, activeIndex]);

  useEffect(() => {
    if (selectedMockup) {
      const updatedSelected = filteredMockups.find(
        (item) => item.id === selectedMockup.id
      );

      if (!updatedSelected) {
        setSelectedMockup(null);
      } else {
        setSelectedMockup(updatedSelected);
      }
    }
  }, [filteredMockups, selectedMockup]);

  const nextMockup = () => {
    if (!total) return;

    setDirection(1);

    setActiveIndex((prev) => {
      const nextIndex = (prev + 1) % total;

      if (selectedMockup) {
        setSelectedMockup(filteredMockups[nextIndex]);
      }

      return nextIndex;
    });
  };

  const prevMockup = () => {
    if (!total) return;

    setDirection(-1);

    setActiveIndex((prev) => {
      const nextIndex = (prev - 1 + total) % total;

      if (selectedMockup) {
        setSelectedMockup(filteredMockups[nextIndex]);
      }

      return nextIndex;
    });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveIndex(0);
    setSelectedMockup(null);
  };

  const handleSelectCard = (item) => {
    const index = filteredMockups.findIndex(
      (mockup) => mockup.id === item.id
    );

    if (index !== -1) {
      setActiveIndex(index);
    }

    setSelectedMockup(item);
  };

  const handleDotClick = (index) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);

    if (selectedMockup) {
      setSelectedMockup(filteredMockups[index]);
    }
  };

  const getCardPosition = (index) => {
    const diff = index - activeIndex;

    if (diff === 0) return 'center';

    if (diff === 1 || diff === -(total - 1)) {
      return 'right';
    }

    if (diff === -1 || diff === total - 1) {
      return 'left';
    }

    return 'hidden';
  };

  const cardVariants = {
    center: {
      x: '0%',
      y: 0,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      zIndex: 10,
      filter: 'brightness(1)',
    },

    left: {
      x: '-62%',
      y: 18,
      scale: 0.82,
      rotateY: 38,
      rotateZ: -3,
      opacity: 0.62,
      zIndex: 5,
      filter: 'brightness(0.55)',
    },

    right: {
      x: '62%',
      y: 18,
      scale: 0.82,
      rotateY: -38,
      rotateZ: 3,
      opacity: 0.62,
      zIndex: 5,
      filter: 'brightness(0.55)',
    },

    hidden: {
      x: direction > 0 ? '120%' : '-120%',
      y: 40,
      scale: 0.65,
      rotateY: direction > 0 ? -55 : 55,
      opacity: 0,
      zIndex: 1,
    },
  };

  return (
    <section
      className="zewd-mockup-section"
      id="mockupshowcase"
    >
      <div className="zewd-container">
        <div className="zewd-section-header">
          <span className="zewd-sub-badge">
            ZEWD SPORTSWEAR
          </span>

          <h2 className="zewd-section-title">
            {t('Mockup kits')}
          </h2>

          <p className="zewd-section-subtitle">
            {t(
              'These jerseys you see are various sports kits that we produce in different colors and designs, tailored to any design you want.'
            )}
          </p>
        </div>

        <MockupFilters
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {loading && (
          <p
            className="zewd-section-subtitle"
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
            }}
          >
            {t('Loading products...')}
          </p>
        )}

        {!loading && error && products.length === 0 && (
          <p
            className="zewd-section-subtitle"
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
            }}
          >
            {error}
          </p>
        )}

        {!loading && total === 0 && (
          <p
            className="zewd-section-subtitle"
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
            }}
          >
            {t('No jerseys found in this category.')}
          </p>
        )}

        {total > 0 && (
          <div className="zewd-3d-showcase">
            <div className="zewd-3d-stage">
              <div className="zewd-3d-glow zewd-3d-glow-red" />
              <div className="zewd-3d-glow zewd-3d-glow-green" />

              <AnimatePresence initial={false}>
                {filteredMockups.map((item, index) => {
                  const position = getCardPosition(index);

                  return (
                    <motion.div
                      key={item.id}
                      className={`zewd-3d-card zewd-3d-card-${position}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate={position}
                      transition={{
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <MockupCard
                        item={item}
                        onSelect={handleSelectCard}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <button
                type="button"
                className="zewd-3d-arrow zewd-3d-arrow-left"
                onClick={prevMockup}
                aria-label="Previous mockup"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                className="zewd-3d-arrow zewd-3d-arrow-right"
                onClick={nextMockup}
                aria-label="Next mockup"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="zewd-3d-controls">
              <button
                type="button"
                className="zewd-3d-control-btn"
                onClick={prevMockup}
                aria-label="Previous mockup"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="zewd-3d-counter">
                <strong>
                  {String(activeIndex + 1).padStart(2, '0')}
                </strong>

                <span>/</span>

                <span>
                  {String(total).padStart(2, '0')}
                </span>
              </div>

              <button
                type="button"
                className="zewd-3d-control-btn"
                onClick={nextMockup}
                aria-label="Next mockup"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="zewd-3d-dots">
              {filteredMockups.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    index === activeIndex
                      ? 'zewd-3d-dot active'
                      : 'zewd-3d-dot'
                  }
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to mockup ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="zewd-cta-banner">
          <div className="zewd-cta-content">
            <span className="zewd-cta-label">
              ZEWD CUSTOM KITS
            </span>

            <h3>
              {t('Mockup kits')}
            </h3>

            <p>
              {t(
                'you can choose any jerseys and you can order +251942858585'
              )}
            </p>
          </div>

          {phone ? (
            <a
              href={`tel:${phone}`}
              className="zewd-cta-btn"
            >
              <Phone size={18} />
              <span>
                {t('Call to Action')}
              </span>
            </a>
          ) : (
            <a
              href="#contact"
              className="zewd-cta-btn"
            >
              <Phone size={18} />
              <span>
                {t('Call to Action')}
              </span>
            </a>
          )}
        </div>
      </div>

      {selectedMockup && (
        <MockupModal
          item={selectedMockup}
          phone={phone}
          onClose={() => setSelectedMockup(null)}
          onPrev={prevMockup}
          onNext={nextMockup}
        />
      )}
    </section>
  );
};
