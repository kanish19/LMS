const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/enrollments', require('./routes/enrollment'));
app.use('/api/user', require('./routes/user'));

// Swagger
require('./swagger')(app);

// Test route
app.get('/', (req, res) => {
  res.send('Immersive LMS Backend is running 🚀');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ❌ Stop if no DB URL
if (!MONGO_URI) {
  console.error("❌ MONGO_URI missing");
  process.exit(1);
}

// Start server
const start = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  }
};

start();