const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path'); 


const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Team',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// Local storage for resumes
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const isAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  isAllowed ? cb(null, true) : cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'));
};


const uploadImage = multer({ storage: cloudinaryStorage });
const uploadResume = multer({
  storage: localStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter,
});

module.exports = { uploadImage, uploadResume };
