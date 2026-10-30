const mongoose = require('mongoose');
const dns = require('dns');

// On Windows, local ISP DNS often rejects SRV queries for MongoDB Atlas (_mongodb._tcp).
// Setting Google DNS ensures reliable connection to Atlas clusters.
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if not permitted
}

const autoSeedMongoDB = async () => {
  try {
    const Admin = require('../models/Admin');
    const Event = require('../models/Event');
    const Gallery = require('../models/Gallery');
    const Settings = require('../models/Settings');
    const { initialEvents, initialGallery } = require('../data/seedData');

    // 1. Seed Admin
    const adminExists = await Admin.findOne({ email: 'admin@kalamanram.org' });
    if (!adminExists) {
      await Admin.create({
        name: 'Admin',
        email: 'admin@kalamanram.org',
        password: 'admin123',
        role: 'superadmin'
      });
      console.log('[MongoDB Auto-Seed] Superadmin account created (admin / admin123)');
    }

    // 2. Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0 && initialEvents && initialEvents.length > 0) {
      // Remove raw string _ids so MongoDB generates ObjectId
      const cleanEvents = initialEvents.map(({ _id, ...rest }) => rest);
      await Event.insertMany(cleanEvents);
      console.log(`[MongoDB Auto-Seed] Seeded ${cleanEvents.length} cultural events`);
    }

    // 3. Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0 && initialGallery && initialGallery.length > 0) {
      const cleanGallery = initialGallery.map(({ _id, ...rest }) => rest);
      await Gallery.insertMany(cleanGallery);
      console.log(`[MongoDB Auto-Seed] Seeded ${cleanGallery.length} gallery images`);
    }

    // 4. Seed Settings
    const settingCount = await Settings.countDocuments();
    if (settingCount === 0) {
      await Settings.create({
        kalamanramName: 'இயல் இசை நாடகக் கலைமன்றம்',
        tagline: 'முத்தமிழின் தொன்மை மரபையும், மாண்பையும் போற்றும் தலைசிறந்த கலை நிறுவனம்',
        contactEmail: 'contact@iyalisainaadagam.org',
        contactPhone: '+91 98765 43210',
        address: 'முத்தமிழ் வளாகம், TTK சாலை, சென்னை 600 004',
        facebookUrl: 'https://facebook.com',
        instagramUrl: 'https://instagram.com',
        youtubeUrl: 'https://youtube.com',
        whatsappNumber: '+91 98765 43210',
        announcementBadge: 'மார்கழி கலை விழா 2026',
        announcementText: '2026-ஆம் ஆண்டுக்கான இயல், இசை, நாடகக் கலை விழா முன்பதிவுகள் தொடங்கின!'
      });
      console.log('[MongoDB Auto-Seed] Seeded default cultural settings');
    }
  } catch (err) {
    console.warn('[MongoDB Auto-Seed Warning]:', err.message);
  }
};

const connectDB = async () => {
  const DEFAULT_ATLAS_URI = 'mongodb+srv://abrahamstmarys2a01_db_user:mediawave123@cluster0.mh9rl2o.mongodb.net/kalamanram?retryWrites=true&w=majority';
  let uri = process.env.MONGODB_URI || DEFAULT_ATLAS_URI;

  // Strip wrapping quotes if user pasted with quotes in .env
  uri = uri.replace(/^["']|["']$/g, '').trim();

  // If URI has template placeholder or localhost fallback, use Atlas
  if (uri.includes('<db_username>') || uri.includes('127.0.0.1')) {
    uri = DEFAULT_ATLAS_URI;
  }

  // If URI ends with just '/', append database name 'kalamanram'
  if (uri.endsWith('/')) {
    uri = uri + 'kalamanram?retryWrites=true&w=majority';
  } else if (!uri.includes('?') && !uri.split('/').pop()) {
    uri = uri + '/kalamanram';
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`[MongoDB] Connected successfully to Cloud Database: ${conn.connection.host}/${conn.connection.name}`);
    
    // Seed initial data to MongoDB
    await autoSeedMongoDB();
    return true;
  } catch (error) {
    console.warn(`[MongoDB Notice] MongoDB connection attempt failed: ${error.message}`);
    console.log(`[DB Layer] Using resilient JSON storage fallback while MongoDB credentials are being verified.`);
    return false;
  }
};

module.exports = connectDB;

