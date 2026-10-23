
import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Testimonial = () => {
  const { t, lang } = useLanguage();

  const content = t.testimonial;

  const customers = [
    {
      id: 1,
      name: "Sameri Bekele",
      initials: "SB",
      review: content.review1,
      location:
        lang === "am"
          ? "ኢትዮጵያ"
          : lang === "om"
          ? "Itoophiyaa"
          : "Ethiopia",
    },
    {
      id: 2,
      name: "Hana Tesfaye",
      initials: "HT",
      review: content.review2,
      location:
        lang === "am"
          ? "ኢትዮጵያ"
          : lang === "om"
          ? "Itoophiyaa"
          : "Ethiopia",
    },
    {
      id: 3,
      name: "Dawit Alemu",
      initials: "DA",
      review: content.review3,
      location:
        lang === "am"
          ? "ኢትዮጵያ"
          : lang === "om"
          ? "Itoophiyaa"
          : "Ethiopia",
    },
  ];

  if (!content) {
    return null;
  }

  return (
    <section className="testimonial-section" id="testimonials">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <span className="testimonial-eyebrow">
            {content.eyebrow}
          </span>

          <h2 className="testimonial-heading">
            {content.heading}{" "}
            <span className="testimonial-heading-accent">
              {content.headingAccent}
            </span>
          </h2>

          <p className="testimonial-description">
            {content.description}
          </p>
        </div>

        <div className="testimonial-grid">
          {customers.map((customer) => (
            <article
              className="testimonial-card"
              key={customer.id}
            >
              <div className="testimonial-stars" aria-label="Five stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>

              <p className="testimonial-review">
                “{customer.review}”
              </p>

              <div className="testimonial-customer">
                <div
                  className="testimonial-avatar"
                  aria-hidden="true"
                >
                  {customer.initials}
                </div>

                <div className="testimonial-customer-info">
                  <h3>{customer.name}</h3>
                  <p>{customer.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;



