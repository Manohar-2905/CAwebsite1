const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Newsroom = require('../models/Newsroom');
const auth = require('../middleware/auth');
const { uploadImage } = require('../utils/cloudinary');

// Get all newsroom items
router.get('/', async (req, res) => {
  try {
    const newsroom = await Newsroom.find().sort({ date: -1, createdAt: -1 });
    res.json(newsroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single newsroom item by slug
router.get('/:slug', async (req, res) => {
  try {
    const newsroom = await Newsroom.findOne({ slug: req.params.slug });
    if (!newsroom) {
      return res.status(404).json({ message: 'Newsroom item not found' });
    }
    res.json(newsroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create newsroom item (Admin only)
router.post('/', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, content, date, keywords } = req.body;
    
    const slug = slugify(title, { lower: true, strict: true });
    
    const newsroomData = {
      title,
      slug,
      description,
      content: content || description,
      keywords: keywords ? (Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim())) : []
    };

    if (date) {
      newsroomData.date = new Date(date);
    }

    if (req.file) {
      newsroomData.imageURL = req.file.path;
    }

    const newsroom = new Newsroom(newsroomData);
    await newsroom.save();

    res.status(201).json(newsroom);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Newsroom item with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update newsroom item (Admin only)
router.put('/:id', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, content, date, keywords } = req.body;
    
    const newsroom = await Newsroom.findById(req.params.id);
    if (!newsroom) {
      return res.status(404).json({ message: 'Newsroom item not found' });
    }

    if (title && title !== newsroom.title) {
      newsroom.slug = slugify(title, { lower: true, strict: true });
      newsroom.title = title;
    }

    if (description) newsroom.description = description;
    if (content !== undefined) newsroom.content = content;
    if (date) newsroom.date = new Date(date);
    if (keywords) {
      newsroom.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
    }

    if (req.file) {
      newsroom.imageURL = req.file.path;
    }

    await newsroom.save();
    res.json(newsroom);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Newsroom item with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete newsroom item (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const newsroom = await Newsroom.findById(req.params.id);
    if (!newsroom) {
      return res.status(404).json({ message: 'Newsroom item not found' });
    }

    await Newsroom.findByIdAndDelete(req.params.id);
    res.json({ message: 'Newsroom item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

