const Gallery = require('../models/Gallery');
const { Store, isMongoLive } = require('../data/store');
const { initialGallery } = require('../data/seedData');
const { processUploadedImage } = require('../middleware/upload');

const galleryStore = new Store('gallery', initialGallery);

// @desc    Get all published gallery photos (Public)
// @route   GET /api/gallery
exports.getPublicGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let items = [];

    if (isMongoLive()) {
      const query = { isPublished: true };
      if (category && category !== 'All') query.category = category;
      items = await Gallery.find(query).sort({ createdAt: -1 });
    } else {
      items = galleryStore.find(g => g.isPublished);
      if (category && category !== 'All') {
        items = items.filter(g => g.category === category);
      }
      items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery items',
      error: error.message
    });
  }
};

// @desc    Admin: Get all gallery photos
// @route   GET /api/admin/gallery
exports.adminGetAllGallery = async (req, res) => {
  try {
    let items = [];
    if (isMongoLive()) {
      items = await Gallery.find().sort({ createdAt: -1 });
    } else {
      items = galleryStore.find();
      items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery items'
    });
  }
};

// @desc    Admin: Upload / Add gallery photo
// @route   POST /api/admin/gallery
exports.createGalleryItem = async (req, res) => {
  try {
    const { title, tamilTitle, category, imageUrl, location, description } = req.body;

    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = await processUploadedImage(req.file);
    }

    if (!finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image upload or image URL is required.'
      });
    }

    const itemPayload = {
      title: title || 'Cultural Performance Moment',
      tamilTitle: tamilTitle || '',
      category: category || 'Bharatanatyam',
      imageUrl: finalImageUrl,
      location: location || 'Chennai, Tamil Nadu',
      description: description || '',
      isPublished: true
    };

    let newItem = null;
    if (isMongoLive()) {
      newItem = await Gallery.create(itemPayload);
    } else {
      newItem = galleryStore.create(itemPayload);
    }

    res.status(201).json({
      success: true,
      message: 'Photo added to gallery',
      data: newItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add gallery photo',
      error: error.message
    });
  }
};

// @desc    Admin: Delete gallery photo
// @route   DELETE /api/admin/gallery/:id
exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (isMongoLive()) {
      deleted = await Gallery.findByIdAndDelete(id);
    } else {
      deleted = galleryStore.findByIdAndDelete(id);
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting gallery photo' });
  }
};
