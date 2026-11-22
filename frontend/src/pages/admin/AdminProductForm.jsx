
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  ImagePlus,
  X,
  Package,
  Tag,
  Ruler,
  Layers,
  Star,
  FileText,
  Trash2,
  CheckCircle2,
  LoaderCircle
} from 'lucide-react';

import api from '../../services/api';
import getImageUrl from '../../utils/imageUrl';

const AdminProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const previewUrlsRef = useRef([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Football',
    sizes: 'S, M, L, XL, XXL',
    stockStatus: 'In Stock',
    featured: false
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Load existing product when editing
  useEffect(() => {
    if (!isEditMode) return;

    const fetchProductDetails = async () => {
      try {
        setFetching(true);

        const res = await api.get(`/products/${id}`);

        if (!res.data.success) {
          throw new Error(
            res.data.message || 'Unable to load product details.'
          );
        }

        const p = res.data.product;

        setFormData({
          name: p.name || '',
          description: p.description || '',
          price:
            p.price !== null && p.price !== undefined
              ? String(p.price)
              : '',
          category: [
  'Football',
  'Basketball',
  'Gym',
  'Tennis'
].includes(p.category)
  ? p.category
  : '',
          sizes: p.sizes?.join(', ') || 'S, M, L, XL',
          stockStatus: p.stockStatus || 'In Stock',
          featured: Boolean(p.featured)
        });

        setExistingImages(p.images || []);
      } catch (err) {
        console.error('Product loading error:', err);

        alert(
          err.response?.data?.message ||
          err.message ||
          'Failed to load product details.'
        );

        navigate('/admin/products');
      } finally {
        setFetching(false);
      }
    };

    fetchProductDetails();
  }, [id, isEditMode, navigate]);

  // Clean up temporary image preview URLs
  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Select new images
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length > 5) {
      alert('You can select a maximum of 5 new images.');
      e.target.value = '';
      return;
    }

    const invalidFile = selectedFiles.find(
      file => !file.type.startsWith('image/')
    );

    if (invalidFile) {
      alert('Please select image files only.');
      e.target.value = '';
      return;
    }

    const oversizedFile = selectedFiles.find(
      file => file.size > 5 * 1024 * 1024
    );

    if (oversizedFile) {
      alert('Each image must be 5MB or smaller.');
      e.target.value = '';
      return;
    }

    // Revoke previous preview URLs
    previewUrlsRef.current.forEach(url => {
      URL.revokeObjectURL(url);
    });

    const previews = selectedFiles.map(file =>
      URL.createObjectURL(file)
    );

    previewUrlsRef.current = previews;

    setNewFiles(selectedFiles);
    setImagePreviews(previews);
  };

  // Remove an existing image
  const removeExistingImage = (index) => {
    setExistingImages(prev =>
      prev.filter((_, idx) => idx !== index)
    );
  };

  // Remove a newly selected image
  const removeNewImage = (index) => {
    const url = imagePreviews[index];

    if (url) {
      URL.revokeObjectURL(url);

      previewUrlsRef.current =
        previewUrlsRef.current.filter(item => item !== url);
    }

    setNewFiles(prev =>
      prev.filter((_, idx) => idx !== index)
    );

    setImagePreviews(prev =>
      prev.filter((_, idx) => idx !== index)
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      alert('Please complete all required fields.');
      return;
    }

    const trimmedPrice = String(formData.price).trim();

    if (
      trimmedPrice !== '' &&
      (
        !Number.isFinite(Number(trimmedPrice)) ||
        Number(trimmedPrice) < 0
      )
    ) {
      alert('Please enter a valid price in ETB or leave it blank.');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append('name', formData.name.trim());
      data.append('description', formData.description.trim());
      data.append('price', trimmedPrice);
      data.append('category', formData.category);
      data.append('sizes', formData.sizes);
      data.append('stockStatus', formData.stockStatus);
      data.append('featured', String(formData.featured));

      if (isEditMode) {
        data.append(
          'existingImages',
          JSON.stringify(existingImages)
        );
      }

      newFiles.forEach(file => {
        data.append('images', file);
      });

      const config = {
        timeout: 60000
      };

      let res;

      if (isEditMode) {
        res = await api.put(
          `/admin/products/${id}`,
          data,
          config
        );
      } else {
        res = await api.post(
          '/admin/products',
          data,
          config
        );
      }

      if (res.data.success) {
        alert(
          isEditMode
            ? 'Product updated successfully!'
            : 'Product published successfully!'
        );

        navigate('/admin/products');
      } else {
        alert(
          res.data.message || 'Unable to save product.'
        );
      }

    } catch (err) {
      console.error('========== PRODUCT SUBMISSION ERROR ==========');
      console.error('Message:', err.message);
      console.error('HTTP status:', err.response?.status);
      console.error('Response data:', err.response?.data);
      console.error('Request URL:', err.config?.baseURL, err.config?.url);
      console.error('Error code:', err.code);
      console.error('==============================================');

      if (err.code === 'ECONNABORTED') {
        alert(
          'Upload timed out. Try smaller images or check your internet connection.'
        );
      } else {
        alert(
          err.response?.data?.message ||
          err.message ||
          'Failed to save product. Please try again.'
        );
      }

    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="product-form-loading">
        <LoaderCircle className="form-loading-spinner" size={40} />
        <h3>Loading Product</h3>
        <p>Please wait while we retrieve your product information.</p>
      </div>
    );
  }

  return (
    <div className="admin-product-form-page">

      {/* HEADER */}
      <div className="product-form-header">
        <div>
          <button
            type="button"
            className="product-back-btn"
            onClick={() => navigate('/admin/products')}
          >
            <ArrowLeft size={17} />
            Back to Products
          </button>

          <div className="product-form-eyebrow">
            ZEWD SPORTWEAR / INVENTORY
          </div>

          <h1>
            {isEditMode ? 'Edit Product' : 'Add New Product'}
            <span>.</span>
          </h1>

          <p>
            {isEditMode
              ? 'Update your product information and images.'
              : 'Create a new product for your sportswear collection.'}
          </p>
        </div>

        <div className="product-form-header-icon">
          <Package size={35} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="admin-product-form"
      >

        {/* BASIC INFORMATION */}
        <section className="product-form-section">
          <div className="product-form-section-title">
            <div className="form-section-icon">
              <Package size={19} />
            </div>

            <div>
              <h2>Product Information</h2>
              <p>Enter the essential details of your product.</p>
            </div>
          </div>

          <div className="product-form-grid">

            <div className="product-field full-width">
              <label htmlFor="product-name">
                Product Name <span>*</span>
              </label>

              <div className="product-input-wrapper">
                <Package size={18} />

                <input
                  id="product-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ethiopian National Team Home Jersey"
                  required
                />
              </div>
            </div>

   
<div className="product-field">
  <label htmlFor="product-category">
    Category <span>*</span>
  </label>

  <div className="product-input-wrapper">
    <Tag size={18} />

    <select
      id="product-category"
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
    >
      <option value="" disabled>
        Select Product Category
      </option>

      <option value="Football">Football</option>
      <option value="Basketball">Basketball</option>
      <option value="Gym">Gym</option>
      <option value="Tennis">Tennis</option>
    </select>
  </div>
</div>


            <div className="product-field">
              <label htmlFor="product-price">
                Price (ETB) (Optional)
              </label>

              <div className="product-input-wrapper">
                <span className="currency-prefix">ETB</span>

                <input
                  id="product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Optional (e.g. 2500)"
                />
              </div>

              <small>Leave blank if price is not set or varies.</small>
            </div>

            <div className="product-field">
              <label htmlFor="product-sizes">
                Available Sizes
              </label>

              <div className="product-input-wrapper">
                <Ruler size={18} />

                <input
                  id="product-sizes"
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  placeholder="S, M, L, XL, XXL"
                />
              </div>

              <small>Separate sizes with commas.</small>
            </div>

            <div className="product-field">
              <label htmlFor="product-stock">
                Stock Status
              </label>

              <div className="product-input-wrapper">
                <Layers size={18} />

                <select
                  id="product-stock"
                  name="stockStatus"
                  value={formData.stockStatus}
                  onChange={handleChange}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="product-form-section">
          <div className="product-form-section-title">
            <div className="form-section-icon">
              <FileText size={19} />
            </div>

            <div>
              <h2>Product Description</h2>
              <p>Tell customers what makes this product special.</p>
            </div>
          </div>

          <div className="product-field">
            <label htmlFor="product-description">
              Description <span>*</span>
            </label>

            <textarea
              id="product-description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the fabric, fit, material, design and special features..."
              required
            />
          </div>
        </section>

        {/* FEATURED PRODUCT */}
        <section className="product-featured-section">
          <div className="featured-section-icon">
            <Star size={22} />
          </div>

          <div className="featured-section-content">
            <h3>Featured Product</h3>
            <p>
              Highlight this product in the homepage spotlight.
            </p>
          </div>

          <label className="featured-toggle">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />

            <span className="featured-toggle-slider"></span>
          </label>
        </section>

        {/* IMAGE MANAGEMENT */}
        <section className="product-form-section">
          <div className="product-form-section-title">
            <div className="form-section-icon">
              <ImagePlus size={19} />
            </div>

            <div>
              <h2>Product Images</h2>
              <p>Upload attractive images of your product.</p>
            </div>
          </div>

          {existingImages.length > 0 && (
            <div className="product-image-group">
              <div className="product-image-heading">
                <h3>Existing Images</h3>
                <span>{existingImages.length} images</span>
              </div>

              <div className="product-image-grid">
                {existingImages.map((img, index) => (
                  <div
                    className="product-image-card"
                    key={img.fileId || img.public_id || img.url || index}
                  >
                    <img
                      src={getImageUrl(img.url)}
                      alt="Existing product"
                    />

                    <span className="image-existing-label">
                      Existing
                    </span>

                    <button
                      type="button"
                      className="image-remove-btn"
                      onClick={() => removeExistingImage(index)}
                      aria-label="Remove existing image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="product-image-group">
            <div className="product-image-heading">
              <h3>Upload New Images</h3>
              <span>Maximum 5 new images</span>
            </div>

            <div
              className="product-upload-area"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="upload-icon">
                <Upload size={28} />
              </div>

              <h3>Choose Product Images</h3>

              <p>
                Click here to browse images from your device.
              </p>

              <span>
                PNG, JPG, JPEG, WEBP · Maximum 5MB each
              </span>

              <button
                type="button"
                className="upload-browse-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <ImagePlus size={16} />
                Browse Images
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </div>

            {imagePreviews.length > 0 && (
              <>
                <div className="product-image-heading selected-images-heading">
                  <h3>Selected Images</h3>
                  <span>{imagePreviews.length} selected</span>
                </div>

                <div className="product-image-grid">
                  {imagePreviews.map((src, index) => (
                    <div
                      className="product-image-card"
                      key={src}
                    >
                      <img
                        src={src}
                        alt={`New product ${index + 1}`}
                      />

                      <span className="image-new-label">
                        New Image
                      </span>

                      <button
                        type="button"
                        className="image-remove-btn"
                        onClick={() => removeNewImage(index)}
                        aria-label="Remove selected image"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* FORM ACTIONS */}
        <div className="product-form-actions">
          <button
            type="button"
            className="product-cancel-btn"
            onClick={() => navigate('/admin/products')}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="product-publish-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle
                  className="form-button-spinner"
                  size={18}
                />
                {isEditMode
                  ? 'Updating Product...'
                  : 'Publishing Product...'}
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                {isEditMode
                  ? 'Update Product'
                  : 'Publish Product'}
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminProductForm;

  