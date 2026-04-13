const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const userRoutes = require('./routes/user');
const swaggerSetup = require('./swagger');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // later you can restrict to frontend URL
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/users', userRoutes);

// Swagger
swaggerSetup(app);

// Test route
app.get('/', (req, res) => {
  res.send('Immersive LMS Backend is running 🚀');
});

// ENV variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('Connecting to MongoDB...');

// MongoDB connection
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('MongoDB connected ✅');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error ❌:', err.message);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (⚠️ DB FAILED)`);
  });
});