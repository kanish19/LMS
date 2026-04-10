const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerSetup = require('./swagger');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const userRoutes = require('./routes/user');

const app = express();

/* =========================
   Core Middleware
========================= */
app.use(cors());
app.use(express.json()); // REQUIRED for req.body parsing

/* =========================
   Swagger Docs
========================= */
swaggerSetup(app);

/* =========================
   MongoDB Connection
========================= */
mongoose.connect('mongodb://127.0.0.1:27017/virtual_campus')
  .then(() => {
    console.log('MongoDB connected ✅');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

/* =========================
   Test Route
========================= */
app.get('/', (req, res) => {
  res.send('Server is running!');
});

/* =========================
   API Routes
========================= */
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/users', userRoutes);

/* =========================
   Start Server
========================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});