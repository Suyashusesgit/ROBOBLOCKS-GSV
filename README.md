# RoboBlocks - National Robotics Event Platform

A premium, award-level robotics event platform built with the MERN stack. RoboBlocks provides a complete solution for managing national-level robotics competitions, including team registration, event information, and team dashboards.

## Features

- **Modern Frontend**: React SPA with smooth animations using GSAP, Framer Motion, and Lenis
- **Premium Design**: Dark, futuristic aesthetic with high-contrast accessibility
- **Complete Backend**: RESTful API with JWT authentication, file uploads, and admin controls
- **Team Management**: Registration system with payment proof upload and status tracking
- **Responsive Design**: Desktop-first, mobile-optimized interface

## Tech Stack

### Frontend
- React 18 (Vite)
- React Router
- Framer Motion
- GSAP + ScrollTrigger
- Lenis (Smooth Scroll)
- CSS Modules
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Uploads)
- Express Validator
- Helmet, CORS, Rate Limiting

## Project Structure

```
ROBOBLOCKS-GSV/
├── frontend/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── animations/     # Animation providers
│   │   ├── services/       # API and auth services
│   │   └── styles/         # Global styles
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── models/         # MongoDB models
│   │   ├── middlewares/    # Auth, rate limiting
│   │   ├── validators/     # Input validation
│   │   ├── utils/          # Utilities
│   │   └── config/         # Configuration
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ROBOBLOCKS-GSV
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:

Backend (`backend/.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roboblocks
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api/v1
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Start the backend server:
```bash
cd backend
npm run dev
```

7. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Teams
- `GET /api/v1/teams` - Get all teams
- `GET /api/v1/teams/:id` - Get team by ID (authenticated)
- `POST /api/v1/teams/register` - Register a new team
- `PUT /api/v1/teams/:id` - Update team (authenticated)
- `DELETE /api/v1/teams/:id` - Delete team (admin only)

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (authenticated)

## Features Overview

### Frontend Sections
- **Hero**: Animated 3D SVG robot with call-to-action
- **About**: Event information and statistics
- **Rules**: Competition rules and guidelines
- **Timeline**: Scroll-synced event timeline
- **Registration**: Team registration form with file upload
- **Teams**: Display of registered teams
- **Organizers**: Event organizers information
- **Sponsors**: Sponsor showcase
- **Dashboard**: Post-registration team dashboard

### Animation System
- Smooth scroll with Lenis
- Scroll-triggered reveals (fade, slide, scale)
- Parallax effects
- Section pinning
- SVG animations
- Hover micro-interactions

### Backend Features
- JWT-based authentication
- Secure file uploads (payment proof)
- Input validation
- Rate limiting
- Role-based access control (admin/user)
- Team status tracking (pending/approved/rejected)

## Security

- Helmet.js for secure headers
- CORS configuration
- Rate limiting on API endpoints
- Input validation and sanitization
- JWT token expiration
- Password hashing with bcrypt
- File upload restrictions

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm start
```

## License

See LICENSE file for details.

## Contributing

This is a production-ready platform built for national-level robotics events. Follow the coding standards and architecture patterns established in the codebase.
