const Event = require('../models/Event');
const Enquiry = require('../models/Enquiry');
const Gallery = require('../models/Gallery');
const { Store, isMongoLive } = require('../data/store');

const isUpcoming = (dateStr) => {
  const eventDate = new Date(dateStr);
  const now = new Date('2026-10-30');
  eventDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return eventDate >= now;
};

// @desc    Admin Dashboard Key Statistics
// @route   GET /api/admin/dashboard/stats
exports.getDashboardStats = async (req, res) => {
  try {
    let events = [];
    let enquiries = [];
    let galleryCount = 0;

    if (isMongoLive()) {
      events = await Event.find();
      enquiries = await Enquiry.find();
      galleryCount = await Gallery.countDocuments();
    } else {
      const eventStore = new Store('events', []);
      const enquiryStore = new Store('enquiries', []);
      const galleryStore = new Store('gallery', []);
      events = eventStore.find();
      enquiries = enquiryStore.find();
      galleryCount = galleryStore.find().length;
    }

    const totalEvents = events.length;
    const upcomingEvents = events.filter(e => isUpcoming(e.date)).length;
    const completedEvents = events.filter(e => !isUpcoming(e.date)).length;

    const totalEnquiries = enquiries.length;
    const pendingEnquiries = enquiries.filter(e => e.status === 'Pending').length;
    const contactedEnquiries = enquiries.filter(e => e.status === 'Contacted').length;
    const confirmedEnquiries = enquiries.filter(e => e.status === 'Confirmed').length;
    const rejectedEnquiries = enquiries.filter(e => e.status === 'Rejected').length;

    // Recent enquiries (latest 5)
    const recentEnquiries = [...enquiries]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Upcoming events (next 4)
    const nextEvents = [...events]
      .filter(e => isUpcoming(e.date))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);

    res.status(200).json({
      success: true,
      stats: {
        totalEvents,
        upcomingEvents,
        completedEvents,
        totalEnquiries,
        pendingEnquiries,
        contactedEnquiries,
        confirmedEnquiries,
        rejectedEnquiries,
        galleryCount
      },
      recentEnquiries,
      nextEvents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics',
      error: error.message
    });
  }
};
