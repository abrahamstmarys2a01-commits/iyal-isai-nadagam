const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Disk storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `kalamanram_${Date.now()}_${Math.round(Math.random() * 1E6)}${ext}`;
    cb(null, uniqueName);
  }
});

// File filter (images only)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WEBP, GIF) are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

// Cloudinary or Local upload helper
const processUploadedImage = async (file) => {
  if (!file) return null;

  // Try Cloudinary upload if configured, else fall back to served local file
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;

  if (cloudName && cloudName !== 'demo' && apiKey && apiKey !== 'demo') {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'kalamanram_uploads'
      });
      // remove local temp file after upload
      fs.unlink(file.path, () => {});
      return result.secure_url;
    } catch (e) {
      console.warn('[Cloudinary Upload Error, using local file URL]:', e.message);
    }
  }

  // Return server-accessible relative URL
  const serverBase = process.env.SERVER_BASE_URL || 'https://iyal-isai-nadagam.onrender.com';
  return `${serverBase}/uploads/${file.filename}`;
};

module.exports = {
  upload,
  processUploadedImage
};
