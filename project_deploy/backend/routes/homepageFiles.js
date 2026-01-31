const express = require('express');
const router = express.Router();
const HomepageFile = require('../models/HomepageFile');
const auth = require('../middleware/auth');
const { uploadPDF } = require('../utils/cloudinary');

// Get all homepage files
router.get('/', async (req, res) => {
  try {
    const files = await HomepageFile.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create homepage file (Admin only)
router.post('/', auth, uploadPDF.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const file = new HomepageFile({
      title,
      description: description || '',
      fileURL: req.file.path,
      fileName: req.file.originalname
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete homepage file (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await HomepageFile.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    await HomepageFile.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
