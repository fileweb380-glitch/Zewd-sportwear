
import api from '../services/api';

const BACKEND_ORIGIN = new URL(
  api.defaults.baseURL,
  window.location.origin
).origin;

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';

  // Keep existing Cloudinary URLs working.
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  // Load GridFS images from the Render backend.
  return new URL(imageUrl, BACKEND_ORIGIN).href;
};

export default getImageUrl;
