require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const settingRoutes = require('./routes/settingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Iyal Isai Naadaga Kalamanram API',
    time: new Date().toISOString()
  });
});

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api', settingRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`[Express Server] Iyal Isai Naadaga Kalamanram backend listening on http://localhost:${PORT}`);
});
