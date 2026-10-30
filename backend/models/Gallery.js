const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  tamilTitle: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    default: 'Bharatanatyam'
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  location: {
    type: String,
    default: 'Chennai, Tamil Nadu'
  },
  description: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

GallerySchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
