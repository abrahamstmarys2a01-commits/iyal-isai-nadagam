const Settings = require('../models/Settings');
const { Store, isMongoLive } = require('../data/store');

const defaultSettings = [
  {
    _id: 'settings_default',
    orgName: 'Iyal Isai Naadaga Kalamanram',
    orgTamilName: 'இயல் இசை நாடகக் கலைமன்றம்',
    phone: '+91 98765 43210',
    alternatePhone: '+91 94440 12345',
    email: 'contact@iyalisainaadagam.org',
    address: 'Muthamizh Valagam, Heritage Arts Corridor, TTK Road & Santhome High Road, Chennai 600 004, Tamil Nadu, India',
    whatsapp: '+919876543210',
    officeHours: 'Mon – Sat: 9:00 AM – 7:30 PM IST'
  }
];

const settingsStore = new Store('settings', defaultSettings);

// @desc    Get contact settings (Public)
// @route   GET /api/settings
exports.getSettings = async (req, res) => {
  try {
    let settings = null;
    if (isMongoLive()) {
      settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create(defaultSettings[0]);
      }
    } else {
      settings = settingsStore.read()[0] || defaultSettings[0];
    }

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve settings' });
  }
};

// @desc    Update contact settings (Admin)
// @route   PUT /api/admin/settings
exports.updateSettings = async (req, res) => {
  try {
    let updated = null;
    if (isMongoLive()) {
      updated = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    } else {
      const all = settingsStore.read();
      all[0] = { ...all[0], ...req.body, updatedAt: new Date().toISOString() };
      settingsStore.write(all);
      updated = all[0];
    }

    res.status(200).json({
      success: true,
      message: 'Contact settings updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
};
