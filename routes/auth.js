const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const JWT_SECRET = 'mysecretkey';

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student'
    });

    res.status(201).json({
      message: 'Student registered successfully',
      user
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

/**
 * @swagger
 * /api/auth/admin-signup:
 *   post:
 *     summary: Register an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post('/admin-signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: 'Admin already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    res.status(201).json({
      message: 'Admin registered successfully',
      admin
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user/admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    res.json({
      message: 'Login successful',
      token,
      user
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;    