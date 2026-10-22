import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Replace these sample entries with genuine customer reviews.
const testimonials = [
  {
    id: 1,
    name: "Customer One",
    role: "Verified customer",
    review:
      "Add a genuine customer review here about their experience with Zewd Sportwear.",
    rating: 5,
  },
  {
    id: 2,
    name: "Customer Two",
    role: "Verified customer",
    review:
      "Add another genuine review describing the product quality or customer service.",
    rating: 5,
  },
  {
    id: 3,
    name: "Customer Three",
    role: "Verified customer",
    review:
      "Add a real customer's feedback about ordering and their experience with the brand.",
    rating: 5,
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Testimonial() {
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
            CUSTOMER EXPERIENCES
          </span>

          <h2 id="testimonial-heading">
            What Our Customers <span>Say</span>
          </h2>

          <p>
            Every order matters. Discover what our customers
            think about their experience with Zewd Sportwear.
          </p>
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
                "{testimonial.review}"
              </p>

              <div className="testimonial-customer">
                <div className="testimonial-avatar" aria-hidden="true">
                  {testimonial.name.charAt(0)}
                </div>

                <div className="testimonial-customer-info">
                  <h3>{testimonial.name}</h3>
                  <span>{testimonial.role}</span>
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

