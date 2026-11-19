import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <a href="#home" className="brand-logo">
              <div className="logo-icon-wrapper">
                <img
                  src="/tiktokx-cropcenter_1080_1080.jpeg"
                  alt="ZEWD Sportswear"
                />
              </div>

              <div className="brand-text">
                <span className="brand-name">ZEWD</span>
                <span className="brand-sub">SPORTSWEAR</span>
              </div>
            </a>

            <p className="footer-desc">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">
              {t.footer.quickLinks}
            </h4>

            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#why-us">{t.nav.whyUs}</a>
            <a href="#gallery">{t.nav.gallery}</a>
          </div>

          {/* Products */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">
              {t.footer.products}
            </h4>

            <a href="#products">
              {t.products.categories.football}
            </a>

            <a href="#products">
              {t.products.categories.basketball}
            </a>

            <a href="#products">
              {t.products.categories.training}
            </a>

            <a href="#products">
              {t.products.categories.custom}
            </a>
          </div>

          {/* Contact */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">
              {t.footer.contactUs}
            </h4>

            <p className="footer-contact-info">
              {t.contact.addressVal}
            </p>

            <p className="footer-contact-info"
            >
                    0909 09 09 73
            </p>

            <p className="footer-contact-info">
              {t.contact.emailVal}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} ZEWD Sportswear.{' '}
            {t.footer.rights}
          </p>

          <div className="footer-ethiopia-flag">
            <span className="flag-stripe red"></span>
            <span className="flag-stripe yellow"></span>
            <span className="flag-stripe green"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};