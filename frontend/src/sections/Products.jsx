import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export const Products = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const products = [
    {
      id: 1,
      title: "Football Jersey",
      desc: "Premium football jersey designed for comfort, performance, and style.",
      category: "football",
      image: "/photo_2026-09-16_12-10-31.jpg",
    },
    {
      id: 2,
      title: "Basketball Jersey",
      desc: "Lightweight basketball jersey made for freedom of movement.",
      category: "basketball",
      image: "/customs_basketball_collections_photo_2.webp",
    },
    {
      id: 3,
      title: "Training Wear",
      desc: "Comfortable and durable sportswear for training and workouts.",
      category: "training",
      image: "/Football-Widget-.png",
    },
    {
      id: 4,
      title: "Gym Kit",
      desc: "Custom-designed team kits created to represent your team identity.",
      category: "custom",
      image: "/52a75f80fd420993c034da5272248de0.jpg",
    },
    {
      id: 5,
      title: "Rugby Kit",
      desc: "Professional training wear built for football players and teams.",
      category: "American soccer",
      image: "/ks-20230707-re-074.jpg",
    },
    {
      id: 6,
      title: "Performance Sportswear",
      desc: "Modern performance clothing for athletes and active lifestyles.",
      category: "training",
      image: "/a5d3edbb028fb18ba3f0494d8ffa0a21.jpg",
    },
  ];

  const categories = [
    { key: "all", label: t.products.categories.all },
    { key: "football", label: t.products.categories.football },
    { key: "American soccer", label: t.products.categories.Americansoccer },
    { key: "basketball", label: t.products.categories.basketball},
    { key: "training", label: t.products.categories.training },
    { key: "custom", label: t.products.categories.custom },
  ];

  const filteredItems =
    activeTab === "all"
      ? products
      : products.filter((item) => item.category === activeTab);

  return (
    <section id="products" className="products-section section-padding">
      <div className="container">

        {/* Header */}
        <div className="products-header">
          <div>
            <div className="section-badge">
              <span className="badge-dot"></span>
              {t.products.badge}
            </div>

            <h2 className="section-title">
              {t.products.title}
            </h2>

            <p className="section-subtitle">
              {t.products.subtitle}
            </p>
          </div>
        </div>

        {/* Products */}
        <motion.div
          className="products-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="product-card glass-panel glass-panel-hover"
              >

                {/* Product Image */}
                <div className="product-image-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="product-image"
                  />

                  <div className="product-badge-cat">
                    {item.category}
                  </div>
                </div>

                {/* Product Information */}
                <div className="product-info">
                  <h3 className="product-title">
                    {item.title}
                  </h3>

                  <p className="product-desc">
                    {item.desc}
                  </p>

                  <div className="product-card-footer">
                    <a
                      href="#mockupshowcase"
                      className="product-action-btn"
                    >
                      <span>
                        {t.products.viewDetails}
                      </span>

                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
export default Products;