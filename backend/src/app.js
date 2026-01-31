const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
// const xss = require('xss-clean');
const mongoSanitize = require('./middlewares/mongoSanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Initialize app
const app = express();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5175',
        'https://roboblocks-gsv.vercel.app', // Explicitly allow your Vercel URL
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); // Enable CORS with specific origin

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per 10 mins
});
app.use(limiter);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Sanitization
app.use(mongoSanitize()); // Prevent NoSQL injection
// app.use(xss()); // Removed: Incompatible with Express 5
app.use(hpp()); // Prevent HTTP Param Pollution

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
