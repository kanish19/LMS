const express = require('express');
const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Admin creates a course
 */
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: 'Course created successfully',
      course
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 */
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Admin updates a course
 */
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: 'Course updated successfully',
      course
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Admin deletes a course
 */
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Course deleted successfully'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;