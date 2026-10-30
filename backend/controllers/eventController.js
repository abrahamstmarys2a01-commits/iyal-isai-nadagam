const Event = require('../models/Event');
const { Store, isMongoLive } = require('../data/store');
const { initialEvents } = require('../data/seedData');
const { processUploadedImage } = require('../middleware/upload');

const eventStore = new Store('events', initialEvents);

// Helper to determine upcoming vs completed
const isUpcoming = (dateStr) => {
  const eventDate = new Date(dateStr);
  const now = new Date('2026-10-30'); // Current calendar context
  eventDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return eventDate >= now;
};

// @desc    Get all published events (Public)
// @route   GET /api/events
exports.getPublicEvents = async (req, res) => {
  try {
    const { category, search, status } = req.query;
    let events = [];

    if (isMongoLive()) {
      const query = { isPublished: true };
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { tamilTitle: { $regex: search, $options: 'i' } },
          { venue: { $regex: search, $options: 'i' } },
          { shortDesc: { $regex: search, $options: 'i' } }
        ];
      }
      events = await Event.find(query).sort({ date: 1 });
    } else {
      events = eventStore.find(e => e.isPublished);
      if (category && category !== 'All') {
        events = events.filter(e => e.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        events = events.filter(e =>
          (e.title && e.title.toLowerCase().includes(s)) ||
          (e.tamilTitle && e.tamilTitle.toLowerCase().includes(s)) ||
          (e.venue && e.venue.toLowerCase().includes(s)) ||
          (e.shortDesc && e.shortDesc.toLowerCase().includes(s))
        );
      }
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Apply upcoming/completed filter
    if (status === 'upcoming') {
      events = events.filter(e => isUpcoming(e.date));
    } else if (status === 'completed') {
      events = events.filter(e => !isUpcoming(e.date));
    }

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch public events',
      error: error.message
    });
  }
};

// @desc    Get single event by ID or slug
// @route   GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    let event = null;

    if (isMongoLive()) {
      event = await Event.findById(id);
    } else {
      event = eventStore.findById(id);
    }

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving event',
      error: error.message
    });
  }
};

// @desc    Admin: Get all events (including drafts)
// @route   GET /api/admin/events
exports.adminGetAllEvents = async (req, res) => {
  try {
    let events = [];

    if (isMongoLive()) {
      events = await Event.find().sort({ date: -1 });
    } else {
      events = eventStore.find();
      events.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin events',
      error: error.message
    });
  }
};

// @desc    Admin: Create new event (with poster upload)
// @route   POST /api/admin/events
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      tamilTitle,
      date,
      displayDate,
      time,
      venue,
      category,
      shortDesc,
      fullDesc,
      posterUrl,
      featured,
      isPublished,
      troupe,
      artForm,
      entry,
      schedule
    } = req.body;

    let poster = posterUrl;
    if (req.file) {
      poster = await processUploadedImage(req.file);
    }

    if (!poster) {
      poster = 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop';
    }

    let parsedSchedule = [];
    if (schedule) {
      try {
        parsedSchedule = typeof schedule === 'string' ? JSON.parse(schedule) : schedule;
      } catch (e) {
        parsedSchedule = [];
      }
    }

    const eventPayload = {
      title,
      tamilTitle: tamilTitle || '',
      date,
      displayDate: displayDate || date,
      time: time || '06:00 PM - 09:00 PM',
      venue,
      category: category || 'Bharatanatyam',
      shortDesc,
      fullDesc: fullDesc || shortDesc,
      poster,
      featured: featured === true || featured === 'true',
      isPublished: isPublished === undefined ? true : (isPublished === true || isPublished === 'true'),
      troupe: troupe || 'Kalamanram Cultural Repertory',
      artForm: artForm || 'Classical Arts',
      entry: entry || 'Open to All',
      schedule: parsedSchedule,
      gallery: []
    };

    let newEvent = null;
    if (isMongoLive()) {
      newEvent = await Event.create(eventPayload);
    } else {
      newEvent = eventStore.create(eventPayload);
    }

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
};

// @desc    Admin: Update event
// @route   PUT /api/admin/events/:id
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = { ...req.body };

    if (req.file) {
      updates.poster = await processUploadedImage(req.file);
    }

    if (updates.schedule && typeof updates.schedule === 'string') {
      try {
        updates.schedule = JSON.parse(updates.schedule);
      } catch (e) {}
    }

    if (updates.featured !== undefined) {
      updates.featured = updates.featured === true || updates.featured === 'true';
    }

    if (updates.isPublished !== undefined) {
      updates.isPublished = updates.isPublished === true || updates.isPublished === 'true';
    }

    let updatedEvent = null;
    if (isMongoLive()) {
      updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    } else {
      updatedEvent = eventStore.findByIdAndUpdate(id, updates);
    }

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found for update'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    });
  }
};

// @desc    Admin: Delete event
// @route   DELETE /api/admin/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (isMongoLive()) {
      deleted = await Event.findByIdAndDelete(id);
    } else {
      deleted = eventStore.findByIdAndDelete(id);
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message
    });
  }
};
