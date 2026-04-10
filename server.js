const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const userRoutes = require('./routes/user');
const swaggerSetup = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/users', userRoutes);

swaggerSetup(app);

app.get('/', (req, res) => {
  res.send('Immersive LMS Backend is running!');
});

const PORT = 5000;
// Using localhost instead of 127.0.0.1 for better Windows compatibility
const MONGO_URI = 'mongodb://localhost:27017/virtual_campus';

console.log('Connecting to MongoDB...');

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s if MongoDB isn't running
})
.then(() => {
  console.log('MongoDB connected ✅');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error ❌:', err.message);
  console.log('--------------------------------------------------');
  console.log('IMPORTANT: Please ensure MongoDB is running!');
  console.log('Start it via the MongoDB Compass or Service list.');
  console.log('--------------------------------------------------');
  
  // Start server even if DB fails so individual routes can return 500 instead of hanging
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} (⚠️ DATABASE DISCONNECTED)`);
  });
});