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
  res.send('LMS Server is running!');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/virtual_campus';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000, 
})
.then(() => {
  console.log('MongoDB connected ✅');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error ❌:', err.message);
  console.log('Ensure MongoDB is running locally on port 27017');
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} (Database disconnected)`);
  });
});