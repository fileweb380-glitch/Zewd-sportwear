import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Globe, Menu, X, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { lang, changeLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#mockupshowcase', label: t.nav.products },
    { href: '#about', label: t.nav.about },
    { href: '#why-us', label: t.nav.whyUs },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#contact', label: t.nav.contact }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'am', label: 'አማርኛ' },
    { code: 'om', label: 'Afaan Oromoo' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="brand-logo">
          <div className="logo-icon-wrapper">
          <img src="/tiktokx-cropcenter_1080_1080.jpeg"/>
          </div>
          <div className="logo-text">
            <span className="brand-name">ZEWD</span>
            <span className="brand-sub">SPORTSWEAR</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions-desktop">
          {/* Language Switcher */}
          <div className="lang-selector-container">
            <button 
              className="lang-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
            >
              <Globe size={18} className="lang-icon" />
              <span>{lang.toUpperCase()}</span>
              <ChevronDown size={14} className={`arrow ${langDropdownOpen ? 'open' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="lang-dropdown">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    className={`lang-option ${lang === item.code ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(item.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#contact" className="btn-primary nav-cta">
            {t.nav.orderNow}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-nav-links">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mobile-lang-selector">
            <span className="mobile-lang-title"><Globe size={16} /> Language</span>
            <div className="mobile-lang-buttons">
              {languages.map((item) => (
                <button
                  key={item.code}
                  className={`mobile-lang-btn ${lang === item.code ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage(item.code);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <a 
            href="#contact" 
            className="btn-primary mobile-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.orderNow}
          </a>
        </div>
      )}
    </nav>
  );
};