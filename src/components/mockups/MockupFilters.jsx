import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { categories } from '../../data/mockups';

export const MockupFilters = ({ activeCategory, onSelectCategory }) => {
  const { t } = useTranslation();

  return (
    <div className="zewd-mockup-filters">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`zewd-filter-btn ${isActive ? 'active' : ''}`}
            type="button"
          >
            {t(cat.key)}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="zewd-filter-active-bg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};