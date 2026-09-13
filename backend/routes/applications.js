const express = require('express');
const router = express.Router();
const multer = require('multer');
const Application = require('../models/Application');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

function handleUpload(req, res, next) {
  upload.single('cv')(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds 2MB limit' });
    }
    if (err) {
      return res.status(400).json({ message: err.message || 'Upload failed' });
    }
    next();
  });
}

// POST apply with CV (public)
router.post('/', handleUpload, async (req, res) => {
  try {
    const { name, email, phone, role, message } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Name, email, and role are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'CV file is required' });
    }

    const application = new Application({
      name,
      email,
      phone,
      role,
      message,
      cvPath: `uploads/cvs/${req.file.filename}`,
      cvOriginalName: req.file.originalname
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all applications (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE application (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
