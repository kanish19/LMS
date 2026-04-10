const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/enrollments/{courseId}:
 *   post:
 *     summary: Enroll in a course (Students only)
 */
router.post('/:courseId', authMiddleware, async (req, res) => {
  try {
    // Role check: Block admins from enrolling
    if (req.user.role === 'admin') {
      return res.status(403).json({
        message: 'Admins cannot enroll in courses.'
      });
    }

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: req.user.id,
      course: req.params.courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: 'Already enrolled in this course'
      });
    }

    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: req.params.courseId
    });

    res.status(201).json({
      message: 'Enrolled successfully',
      enrollment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/enrollments/my-courses:
 *   get:
 *     summary: View enrolled courses of logged in user
 */
router.get('/my-courses', authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id
    }).populate('course');

    res.json(enrollments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/enrollments/admin/course/{courseId}:
 *   get:
 *     summary: Admin view all students enrolled in a course
 */
router.get('/admin/course/:courseId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      course: req.params.courseId
    }).populate('user', 'name email');

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;