const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  orgName: {
    type: String,
    default: 'Iyal Isai Naadaga Kalamanram'
  },
  orgTamilName: {
    type: String,
    default: 'இயல் இசை நாடகக் கலைமன்றம்'
  },
  phone: {
    type: String,
    default: '+91 98765 43210'
  },
  alternatePhone: {
    type: String,
    default: '+91 94440 12345'
  },
  email: {
    type: String,
    default: 'contact@iyalisainaadagam.org'
  },
  address: {
    type: String,
    default: 'Muthamizh Valagam, Heritage Arts Corridor, TTK Road & Santhome High Road, Chennai 600 004, Tamil Nadu, India'
  },
  whatsapp: {
    type: String,
    default: '+919876543210'
  },
  officeHours: {
    type: String,
    default: 'Mon – Sat: 9:00 AM – 7:30 PM IST'
  }
}, { timestamps: true });

module.exports = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
