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
    const Setting = require('../models/Setting');
    const { initialEvents, initialGallery, initialSettings } = require('../data/seedData');

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
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0 && initialSettings) {
      const { _id, ...cleanSettings } = initialSettings;
      await Setting.create(cleanSettings);
      console.log('[MongoDB Auto-Seed] Seeded default cultural settings');
    }
  } catch (err) {
    console.warn('[MongoDB Auto-Seed Warning]:', err.message);
  }
};

const connectDB = async () => {
  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kalamanram_db';

  // Strip wrapping quotes if user pasted with quotes in .env
  uri = uri.replace(/^["']|["']$/g, '').trim();

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

