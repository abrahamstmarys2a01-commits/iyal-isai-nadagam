const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required']
  },
  selectedEvent: {
    type: String,
    default: ''
  },
  eventDate: {
    type: String,
    required: [true, 'Event date is required']
  },
  venue: {
    type: String,
    required: [true, 'Venue / Location is required']
  },
  performanceCount: {
    type: String,
    default: '1 Performance (Full Ensemble)'
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Confirmed', 'Rejected'],
    default: 'Pending'
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

EnquirySchema.index({ status: 1, createdAt: -1 });
EnquirySchema.index({ phone: 1, customerName: 1 });

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
