const express = require('express');
const router = express.Router();
const {
  getPublicGallery,
  adminGetAllGallery,
  createGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public route
router.get('/', getPublicGallery);

// Admin protected routes
router.get('/admin/all', protect, adminGetAllGallery);
router.post('/admin/upload', protect, upload.single('image'), createGalleryItem);
router.delete('/admin/:id', protect, deleteGalleryItem);

module.exports = router;
