const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  adminGetEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

// Public route to submit enquiry
router.post('/', createEnquiry);

// Admin protected routes
router.get('/admin/all', protect, adminGetEnquiries);
router.put('/admin/:id/status', protect, updateEnquiryStatus);
router.delete('/admin/:id', protect, deleteEnquiry);

module.exports = router;
