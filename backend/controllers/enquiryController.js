const Enquiry = require('../models/Enquiry');
const { Store, isMongoLive } = require('../data/store');
const { initialEnquiries } = require('../data/seedData');

const enquiryStore = new Store('enquiries', initialEnquiries);

// Generate unique reference ID (e.g. KALAI-892401)
const generateRefId = () => {
  return 'KALAI-' + Math.floor(100000 + Math.random() * 900000);
};

// @desc    Submit new enquiry (Public)
// @route   POST /api/enquiries
exports.createEnquiry = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      eventType,
      selectedEvent,
      eventDate,
      venue,
      performanceCount,
      message
    } = req.body;

    // Field validations
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ success: false, message: 'Customer Name is required.' });
    }

    if (!phone || !phone.trim() || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit phone number is required.' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    if (!eventType) {
      return res.status(400).json({ success: false, message: 'Event Type is required.' });
    }

    if (!eventDate) {
      return res.status(400).json({ success: false, message: 'Event Date is required.' });
    }

    if (!venue || !venue.trim()) {
      return res.status(400).json({ success: false, message: 'Event Venue is required.' });
    }

    const referenceId = generateRefId();

    const enquiryPayload = {
      referenceId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      eventType,
      selectedEvent: selectedEvent || '',
      eventDate,
      venue: venue.trim(),
      performanceCount: performanceCount || '1 Performance (Full Ensemble)',
      message: message || '',
      status: 'Pending'
    };

    let newEnquiry = null;
    if (isMongoLive()) {
      newEnquiry = await Enquiry.create(enquiryPayload);
    } else {
      newEnquiry = enquiryStore.create(enquiryPayload);
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      referenceId,
      data: newEnquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry',
      error: error.message
    });
  }
};

// @desc    Admin: Get all enquiries with filtering & search
// @route   GET /api/admin/enquiries
exports.adminGetEnquiries = async (req, res) => {
  try {
    const { status, eventType, search } = req.query;
    let enquiries = [];

    if (isMongoLive()) {
      const query = {};
      if (status && status !== 'All') query.status = status;
      if (eventType && eventType !== 'All') query.eventType = eventType;
      if (search) {
        query.$or = [
          { customerName: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { referenceId: { $regex: search, $options: 'i' } }
        ];
      }
      enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    } else {
      enquiries = enquiryStore.find();
      if (status && status !== 'All') {
        enquiries = enquiries.filter(e => e.status === status);
      }
      if (eventType && eventType !== 'All') {
        enquiries = enquiries.filter(e => e.eventType === eventType);
      }
      if (search) {
        const s = search.toLowerCase();
        enquiries = enquiries.filter(e =>
          (e.customerName && e.customerName.toLowerCase().includes(s)) ||
          (e.phone && e.phone.includes(s)) ||
          (e.email && e.email.toLowerCase().includes(s)) ||
          (e.referenceId && e.referenceId.toLowerCase().includes(s))
        );
      }
      enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries',
      error: error.message
    });
  }
};

// @desc    Admin: Update enquiry status (Pending, Contacted, Confirmed, Rejected)
// @route   PUT /api/admin/enquiries/:id/status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ['Pending', 'Contacted', 'Confirmed', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be Pending, Contacted, Confirmed, or Rejected.'
      });
    }

    let updated = null;
    if (isMongoLive()) {
      updated = await Enquiry.findByIdAndUpdate(
        id,
        { status, ...(adminNotes !== undefined && { adminNotes }) },
        { new: true }
      );
    } else {
      updated = enquiryStore.findByIdAndUpdate(id, {
        status,
        ...(adminNotes !== undefined && { adminNotes })
      });
    }

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating enquiry status',
      error: error.message
    });
  }
};

// @desc    Admin: Delete enquiry
// @route   DELETE /api/admin/enquiries/:id
exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (isMongoLive()) {
      deleted = await Enquiry.findByIdAndDelete(id);
    } else {
      deleted = enquiryStore.findByIdAndDelete(id);
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting enquiry',
      error: error.message
    });
  }
};
