
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  XCircle,
  Tags,
  ArrowUpRight,
  RefreshCw,
  Plus,
  ShoppingBag,
  LayoutDashboard
} from 'lucide-react';

import api from '../../services/api';


const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    categoriesCount: 0
  });

  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await api.get('/products');

      if (res.data.success) {
        const products = res.data.products || [];

        const total = products.length;

        const inStock = products.filter(
          p => p.stockStatus === 'In Stock'
        ).length;

        const outOfStock = products.filter(
          p => p.stockStatus === 'Out of Stock'
        ).length;

        const categories = new Set(
          products.map(p => p.category).filter(Boolean)
        ).size;

        setStats({
          totalProducts: total,
          inStock,
          outOfStock,
          categoriesCount: categories
        });

        setRecentProducts(products.slice(0, 5));
      } else {
        throw new Error(
          res.data.message || 'Unable to load dashboard data.'
        );
      }

    } catch (err) {
      console.error('Dashboard error:', err);

      alert(
        err.response?.data?.message ||
        err.message ||
        'Failed to load dashboard data. Please try again.'
      );

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      className: 'stat-total',
      description: 'Products in your catalog'
    },
    {
      title: 'In Stock',
      value: stats.inStock,
      icon: CheckCircle2,
      className: 'stat-stock',
      description: 'Available for customers'
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      icon: XCircle,
      className: 'stat-out',
      description: 'Currently unavailable'
    },
    {
      title: 'Categories',
      value: stats.categoriesCount,
      icon: Tags,
      className: 'stat-category',
      description: 'Product collections'
    }
  ];

  if (loading) {
    return (
      <div className="overview-loading">
        <div className="overview-spinner"></div>
        <h3>Preparing your dashboard</h3>
        <p>Loading your sportswear store data...</p>
      </div>
    );
  }

  return (
    <div className="admin-overview">

      {/* PAGE HEADER */}
      <div className="overview-header">

        <div className="overview-heading">
          <div className="overview-breadcrumb">
            <LayoutDashboard size={15} />
            <span>ADMINISTRATION</span>
            <span>/</span>
            <span>OVERVIEW</span>
          </div>

          <h1>
            Dashboard <span>Overview.</span>
          </h1>

          <p>
            Monitor your products, inventory and sportswear catalog
            from one place.
          </p>
        </div>

        <div className="overview-actions">

          <button
            className="overview-refresh-btn"
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            type="button"
          >
            <RefreshCw
              size={17}
              className={refreshing ? 'refresh-spinning' : ''}
            />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>

          <Link
            to="/admin/products/new"
            className="overview-add-btn"
          >
            <Plus size={18} />
            Add Product
          </Link>

        </div>
      </div>

      {/* WELCOME BANNER */}
      <div className="overview-welcome">

        <div className="welcome-content">
          <span className="welcome-label">
            ZEWD SPORTWEAR ADMIN
          </span>

          <h2>
            Manage Your Store.
            <br />
            <span>Build Your Brand.</span>
          </h2>

          <p>
            Everything you need to manage your sportswear
            products, organized in one powerful dashboard.
          </p>

          <Link to="/admin/products" className="welcome-link">
            Explore Products
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="welcome-decoration">
          <ShoppingBag size={100} strokeWidth={1} />
          <span>ZEWD</span>
        </div>

      </div>

      {/* STATISTICS */}
      <section className="overview-stats-section">

        <div className="overview-section-heading">
          <div>
            <span className="section-eyebrow">STORE ANALYTICS</span>
            <h2>At a Glance</h2>
          </div>
        </div>

        <div className="stats-grid">

          {statCards.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                className={`stat-card ${stat.className}`}
                key={stat.title}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="stat-card-top">
                  <div className="stat-icon">
                    <Icon size={23} />
                  </div>

                  <span className="stat-card-label">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value.toLocaleString()}</p>
                  <span>{stat.description}</span>
                </div>

                <div className="stat-card-bottom"></div>
              </div>
            );
          })}

        </div>
      </section>

      {/* RECENT PRODUCTS */}
      <section className="admin-section">

        <div className="section-header">

          <div>
            <span className="section-eyebrow">
              YOUR INVENTORY
            </span>

            <h2>Recent Products</h2>

            <p>Recently added products in your store.</p>
          </div>

          <Link
            to="/admin/products"
            className="admin-text-link"
          >
            View All Products
            <ArrowUpRight size={17} />
          </Link>

        </div>

        <div className="admin-table-container">

          <table className="admin-table">

            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK STATUS</th>
                <th>FEATURED</th>
              </tr>
            </thead>

            <tbody>

              {recentProducts.length === 0 ? (

                <tr>
                  <td colSpan="5">
                    <div className="overview-empty">
                      <Package size={35} />
                      <h3>No products yet</h3>
                      <p>Start building your sportswear collection.</p>

                      <Link to="/admin/products/new">
                        <Plus size={16} />
                        Add Your First Product
                      </Link>
                    </div>
                  </td>
                </tr>

              ) : (

                recentProducts.map(product => (

                  <tr key={product._id}>

                    <td>
                      <div className="product-table-info">

                        {product.images?.[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="table-thumb"
                          />
                        ) : (
                          <div className="table-thumb-placeholder">
                            <Package size={20} />
                          </div>
                        )}

                        <div className="product-table-name">
                          <strong>{product.name}</strong>
                          <span>#{product._id.slice(-6)}</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="product-category">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      <strong className="product-price">
                        ${Number(product.price || 0).toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`product-stock ${
                          product.stockStatus === 'In Stock'
                            ? 'stock-available'
                            : 'stock-unavailable'
                        }`}
                      >
                        <span className="stock-dot"></span>
                        {product.stockStatus}
                      </span>
                    </td>

                    <td>
                      <span className={`featured-status ${
                        product.featured
                          ? 'featured-yes'
                          : 'featured-no'
                      }`}>
                        {product.featured ? 'Featured' : 'Standard'}
                      </span>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* BOTTOM FOOTER */}
      <div className="overview-footer">
        <span>ZEWD SPORTWEAR</span>
        <p>Manage with purpose. Grow with confidence.</p>
      </div>

    </div>
  );
};

export default AdminOverview;
