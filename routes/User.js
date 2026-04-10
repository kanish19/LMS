const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Admin view all users
 */
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.json(users);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;