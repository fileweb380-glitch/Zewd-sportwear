
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
  LayoutDashboard,
  AlertCircle
} from 'lucide-react';

import api from '../../services/api';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    categoriesCount: 0
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');

      const res = await api.get('/products');

      const products = Array.isArray(res.data?.products)
        ? res.data.products
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      if (res.data?.success === false) {
        throw new Error(
          res.data.message || 'Unable to load dashboard data.'
        );
      }

      const total = products.length;

      const inStock = products.filter(product => {
        const status = String(product.stockStatus || '').toLowerCase();
        return status === 'in stock' || status === 'instock';
      }).length;

      const outOfStock = products.filter(product => {
        const status = String(product.stockStatus || '').toLowerCase();
        return status === 'out of stock' || status === 'outofstock';
      }).length;

      const categories = new Set(
        products
          .map(product => product.category)
          .filter(Boolean)
          .map(category => String(category).trim().toLowerCase())
      ).size;

      setStats({
        totalProducts: total,
        inStock,
        outOfStock,
        categoriesCount: categories
      });

    } catch (err) {
      console.error('Dashboard error:', err);

      setError(
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

      {/* ERROR MESSAGE */}
      {error && (
        <div className="overview-error">

          <AlertCircle size={20} />

          <div>
            <strong>Unable to load dashboard data</strong>
            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
          >
            Try Again
          </button>

        </div>
      )}

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

          <Link
            to="/admin/products"
            className="welcome-link"
          >
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
            <span className="section-eyebrow">
              STORE ANALYTICS
            </span>

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
                style={{
                  animationDelay: `${index * 0.08}s`
                }}
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

                  <p>
                    {stat.value.toLocaleString()}
                  </p>

                  <span>{stat.description}</span>

                </div>

                <div className="stat-card-bottom"></div>

              </div>
            );
          })}

        </div>

      </section>

      {/* FOOTER */}
      <div className="overview-footer">

        <span>ZEWD SPORTWEAR</span>

        <p>
          Manage with purpose. Grow with confidence.
        </p>

      </div>

    </div>
  );
};

export default AdminOverview;
