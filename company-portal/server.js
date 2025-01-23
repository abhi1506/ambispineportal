const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2; 
const cookieParser = require('cookie-parser');
//const helmet = require('helmet');
//const compression = require('compression');

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Cloudinary configuration missing. Check environment variables.");
  process.exit(1);
}

// Initialize app
const app = express();
const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware setup
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://ambispinetechnologies.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Enable credentials
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Add security headers
app.use(compression()); // Enable response compression

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

if (envMode === 'DEVELOPMENT') {
  console.log("Cloudinary configuration loaded successfully.");
}

// Import routes
const companyRoutes = require('./routes/companyRoutes');
const teamRoutes = require('./routes/teamRoutes');
const careerRoutes = require('./routes/careerRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const jobRoutes = require('./routes/jobRoutes');
const contactRoutes = require('./routes/contactRoutes');
const contentRoutes = require('./routes/contentRoutes');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require("./routes/employeeRoute");
const imageRoutes = require('./routes/imageRoute');
const quotationRoutes = require("./routes/quotationRoutes");
const errorHandler = require('./middlewar/errorHandler');

// Routes
app.use('/api', imageRoutes);
app.use('/api', companyRoutes);
app.use('/api', employeeRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/admin/careers', careerRoutes);
app.use('/api', jobRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/quotations', quotationRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbStatus = (await connectDB.isConnected()) ? 'UP' : 'DOWN';
  res.status(200).json({
    status: 'UP',
    database: dbStatus,
    timestamp: new Date(),
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await mongoose.connection.close();
  process.exit(0);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on ${port} in ${envMode} mode.`);
});
