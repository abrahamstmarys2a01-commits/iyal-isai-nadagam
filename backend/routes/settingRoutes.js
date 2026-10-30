const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

// Public settings
router.get('/settings', getSettings);

// Admin dashboard stats & settings update
router.get('/admin/dashboard/stats', protect, getDashboardStats);
router.put('/admin/settings', protect, updateSettings);

module.exports = router;
