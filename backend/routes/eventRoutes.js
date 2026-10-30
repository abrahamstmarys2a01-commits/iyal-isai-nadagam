const express = require('express');
const router = express.Router();
const {
  getPublicEvents,
  getEventById,
  adminGetAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', getPublicEvents);
router.get('/:id', getEventById);

// Admin protected routes
router.get('/admin/all', protect, adminGetAllEvents);
router.post('/admin/create', protect, upload.single('poster'), createEvent);
router.put('/admin/:id', protect, upload.single('poster'), updateEvent);
router.delete('/admin/:id', protect, deleteEvent);

module.exports = router;
