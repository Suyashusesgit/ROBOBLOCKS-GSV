const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Initialize app
const app = express();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per 10 mins
});
app.use(limiter);

// Data Sanitization
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Param Pollution

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/teams', require('./routes/teamRoutes'));
app.use('/api/v1/content', require('./routes/contentRoutes'));

// Error Handler (Keep at bottom)
app.use(errorHandler);

module.exports = app;
