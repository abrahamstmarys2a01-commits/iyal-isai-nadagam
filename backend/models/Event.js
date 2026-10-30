const mongoose = require('mongoose');

const ScheduleItemSchema = new mongoose.Schema({
  time: { type: String, required: true },
  item: { type: String, required: true }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  tamilTitle: {
    type: String,
    default: ''
  },
  date: {
    type: String, // YYYY-MM-DD
    required: [true, 'Event date is required']
  },
  displayDate: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
    default: '06:00 PM - 09:00 PM'
  },
  venue: {
    type: String,
    required: [true, 'Venue is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    default: 'Bharatanatyam'
  },
  shortDesc: {
    type: String,
    required: [true, 'Short description is required']
  },
  fullDesc: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    required: [true, 'Poster image is required']
  },
  featured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  troupe: {
    type: String,
    default: 'Kalamanram Cultural Repertory'
  },
  artForm: {
    type: String,
    default: 'Classical Arts'
  },
  entry: {
    type: String,
    default: 'Open to All / Reserved Passes'
  },
  schedule: [ScheduleItemSchema],
  gallery: [{ type: String }]
}, { timestamps: true });

EventSchema.index({ date: 1, isPublished: 1 });
EventSchema.index({ category: 1 });

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
