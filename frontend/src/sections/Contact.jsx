import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Send
} from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      'Thank you for contacting Zewd Sportswear. Our team will get back to you shortly.'
    );
  };

  // Numbers without spaces for tel/WhatsApp links
  const phoneNumber = '0942858585';
  const whatsappNumber = '0909090973';

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="contact-grid">

          {/* Contact Details */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-badge">
              <span className="badge-dot"></span>
              {t.contact.badge}
            </div>

            <h2 className="section-title">
              {t.contact.title}
            </h2>

            <p className="section-subtitle mb-4">
              {t.contact.subtitle}
            </p>

            <div className="contact-cards">

              {/* Phone */}
              <div className="contact-card glass-panel">
                <div className="contact-icon-wrapper">
                  <Phone size={20} />
                </div>

                <div>
                  <h4 className="contact-label">
                    {t.contact.phoneTitle}
                  </h4>

                  <a
                    href={`tel:${phoneNumber}`}
                    className="contact-value"
                  >
                    0942 85 85 85
                  </a>
                </div>
                <div>
                  <h4 className="contact-label">
                    {t.contact.phoneTitle}
                  </h4>

                  <a
                    href={`tel:${phoneNumber}`}
                    className="contact-value"
                  >
                   09 27 27 27 21
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-card glass-panel">
                <div className="contact-icon-wrapper green">
                  <MessageSquare size={20} />
                </div>

                <div>
                  <h4 className="contact-label">
                    {t.contact.whatsappTitle}
                  </h4>

                  <a
                    href={`https://wa.me/251${whatsappNumber.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value"
                  >
                    0919912670
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-card glass-panel">
                <div className="contact-icon-wrapper">
                  <Mail size={20} />
                </div>

                <div>
                  <h4 className="contact-label">
                    {t.contact.emailTitle}
                  </h4>

                  <a
                    href={`mailto:${t.contact.emailVal}`}
                    className="contact-value"
                  >
                    {t.contact.emailVal}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="contact-card glass-panel">
                <div className="contact-icon-wrapper">
                  <MapPin size={20} />
                </div>

                <div>
                  <h4 className="contact-label">
                    {t.contact.addressTitle}
                  </h4>

                  <span className="contact-value">
                    {t.contact.addressVal}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-stage"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              className="contact-form glass-panel"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label className="form-label">
                  {t.contact.formName}
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Abebe Bikila"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t.contact.formEmail}
                </label>

                <input
                  type="email"
                  required
                  placeholder="e.g. name@club.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t.contact.formTeam}
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Saint George SA"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t.contact.formMsg}
                </label>

                <textarea
                  rows="4"
                  required
                  placeholder="Describe your team kit needs..."
                  className="form-input form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary form-submit-btn"
              >
                {t.contact.submit}
                <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};