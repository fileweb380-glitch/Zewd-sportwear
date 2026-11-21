
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Package,
  Edit,
  Trash2,
  RefreshCw,
  ShoppingBag,
  AlertCircle,
  Star,
  Filter
} from 'lucide-react';

import api from '../../services/api';
import getImageUrl from '../../utils/imageUrl';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 350);

    return () => clearTimeout(timer);
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (category !== 'All') {
        params.category = category;
      }

      const res = await api.get('/products', { params });

      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Fetch products error:', err);

      setError(
        err.response?.data?.message ||
        'Failed to load products. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product? Its uploaded images will also be removed.'
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await api.delete(`/admin/products/${id}`);

      if (res.data.success) {
        setProducts(previous =>
          previous.filter(product => product._id !== id)
        );

        alert('Product deleted successfully.');
      } else {
        alert(res.data.message || 'Unable to delete product.');
      }
    } catch (err) {
      console.error('Delete product error:', err);

      alert(
        err.response?.data?.message ||
        'Failed to delete product.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Format price
  const formatPrice = (price) => {
    if (price === null || price === undefined || price === '') {
      return '—';
    }

    const num = Number(price);

    if (!Number.isFinite(num)) {
      return '—';
    }

    return `${num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} ETB`;
  };

  return (
    <div className="admin-products-page">

      {/* HEADER */}
      <div className="products-page-header">
        <div>
          <span className="products-eyebrow">
            INVENTORY MANAGEMENT
          </span>

          <h1>Manage Products</h1>

          <p>
            Organize your sportswear collection and manage your inventory.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="products-add-btn"
        >
          <Plus size={19} />
          Add New Product
        </Link>
      </div>

      {/* SUMMARY */}
      <div className="products-summary">

        <div className="products-summary-card">
          <div className="summary-icon">
            <Package size={21} />
          </div>

          <div>
            <span>Total Products</span>
            <h3>{products.length}</h3>
          </div>
        </div>

        <div className="products-summary-card">
          <div className="summary-icon">
            <ShoppingBag size={21} />
          </div>

          <div>
            <span>In Stock</span>
            <h3>
              {products.filter(
                product => product.stockStatus === 'In Stock'
              ).length}
            </h3>
          </div>
        </div>

        <div className="products-summary-card">
          <div className="summary-icon">
            <Star size={21} />
          </div>

          <div>
            <span>Featured Products</span>
            <h3>
              {products.filter(product => product.featured).length}
            </h3>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="products-filter-panel">

        <div className="products-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="products-category-filter">
          <Filter size={18} />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Football Jerseys">Football Jerseys</option>
            <option value="Basketball Jerseys">Basketball Jerseys</option>
            <option value="Training Wear">Training Wear</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <button
          type="button"
          className="products-refresh-btn"
          onClick={fetchProducts}
          disabled={loading}
          title="Refresh products"
        >
          <RefreshCw size={18} />
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="products-error">
          <AlertCircle size={19} />

          <span>{error}</span>

          <button
            type="button"
            onClick={fetchProducts}
          >
            Try Again
          </button>
        </div>
      )}

      {/* PRODUCT TABLE */}
      <div className="products-table-card">

        <div className="products-table-header">
          <div>
            <h2>All Products</h2>
            <p>Manage your store's products and stock.</p>
          </div>

          <span className="products-count">
            {products.length} Products
          </span>
        </div>

        {loading ? (
          <div className="products-loading">
            <div className="products-spinner"></div>
            <p>Loading your products...</p>
          </div>
        ) : (
          <div className="products-table-wrapper">

            <table className="products-table">

              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>SIZES</th>
                  <th>STOCK STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6">

                      <div className="products-empty">
                        <Package size={38} />

                        <h3>No products found</h3>

                        <p>
                          Try changing your search or add a new product.
                        </p>

                        <Link to="/admin/products/new">
                          <Plus size={17} />
                          Add Product
                        </Link>
                      </div>

                    </td>
                  </tr>
                ) : (

                  products.map(product => (

                    <tr key={product._id}>

                      {/* PRODUCT */}
                      <td>
                        <div className="product-info-cell">

                          <img
                            src={
                              getImageUrl(product.images?.[0]?.url) ||
                              'https://placehold.co/80x80/191919/ffffff?text=No+Image'
                            }
                            alt={product.name}
                            className="product-table-image"
                            onError={e => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                'https://placehold.co/80x80/191919/ffffff?text=No+Image';
                            }}
                          />

                          <div className="product-name-info">
                            <strong>{product.name}</strong>

                            {product.featured && (
                              <span className="product-featured">
                                <Star
                                  size={12}
                                  fill="currentColor"
                                />
                                Featured
                              </span>
                            )}
                          </div>

                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td>
                        <span className="product-category">
                          {product.category}
                        </span>
                      </td>

                      {/* PRICE */}
                      <td>
                        <strong className="product-price">
                          {formatPrice(product.price)}
                        </strong>
                      </td>

                      {/* SIZES */}
                      <td>
                        <span className="product-sizes">
                          {product.sizes?.length
                            ? product.sizes.join(', ')
                            : 'N/A'}
                        </span>
                      </td>

                      {/* STOCK */}
                      <td>
                        <span
                          className={`product-stock ${
                            product.stockStatus === 'In Stock'
                              ? 'stock-available'
                              : 'stock-unavailable'
                          }`}
                        >
                          <span className="stock-dot"></span>

                          {product.stockStatus || 'Unknown'}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="product-actions">

                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="product-edit-btn"
                            title="Edit product"
                          >
                            <Edit size={16} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(product._id)}
                            className="product-delete-btn"
                            disabled={deletingId === product._id}
                            title="Delete product"
                          >
                            {deletingId === product._id ? (
                              <RefreshCw
                                size={16}
                                className="spin-icon"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminProducts;


