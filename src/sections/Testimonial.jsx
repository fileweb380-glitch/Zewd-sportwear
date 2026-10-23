
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslation } from
'react-i18next';

const testimonials = [
  {
    id: 1,
    name: "Sample Customer 1",
    location: "Jimma",
    rating: 5,
    reviewKey: "testimonial.review1",
  },
  {
    id: 2,
    name: "Sample Customer 2",
    location: "Jimma",
    rating: 5,
    reviewKey: "testimonial.review2",
  },
  {
    id: 3,
    name: "Sample Customer 3",
    location: "Jimma",
    rating: 5,
    reviewKey: "testimonial.review3",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function Testimonial() {
  const { t } = useTranslation();

  return (
    <section
      className="testimonial-section"
      id="testimonials"
      aria-labelledby="testimonial-heading"
    >
      <div className="testimonial-container">
        <motion.div
          className="testimonial-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="testimonial-eyebrow">
            {t("testimonial.eyebrow")}
          </span>

          <h2 id="testimonial-heading">
            {t("testimonial.heading")}{" "}
            <span>{t("testimonial.headingAccent")}</span>
          </h2>

          <p>{t("testimonial.description")}</p>
        </motion.div>

        <motion.div
          className="testimonial-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((testimonial) => (
            <motion.article
              className="testimonial-card"
              key={testimonial.id}
              variants={cardVariants}
            >
              <div className="testimonial-card-top">
                <div className="testimonial-quote-icon">
                  <Quote size={25} aria-hidden="true" />
                </div>

                <div
                  className="testimonial-stars"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from(
                    { length: testimonial.rating },
                    (_, index) => (
                      <Star
                        key={index}
                        size={17}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>
              </div>

              <p className="testimonial-review">
                "{t(testimonial.reviewKey)}"
              </p>

              <div className="testimonial-customer">
                <div
                  className="testimonial-avatar"
                  aria-hidden="true"
                >
                  {testimonial.name.charAt(0)}
                </div>

                <div className="testimonial-customer-info">
                  <h3>{testimonial.name}</h3>
                  <span>
                    {t("testimonial.customerLocation", {
                      location: testimonial.location,
                    })}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonial;


