const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Career = require('../models/Career');
const auth = require('../middleware/auth');
const { uploadImage } = require('../utils/cloudinary');

// Get all careers (public: only active, admin: all)
router.get('/', async (req, res) => {
  try {
    // Check if user is authenticated (admin) by checking for auth header
    const authHeader = req.headers.authorization;
    let query = {};
    
    // If not admin, only show active careers
    if (!authHeader) {
      query.isActive = true;
    }
    
    const careers = await Career.find(query).sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single career by slug
router.get('/:slug', async (req, res) => {
  try {
    const career = await Career.findOne({ slug: req.params.slug, isActive: true });
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create career (Admin only)
router.post('/', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, content, location, department, type, keywords, isActive } = req.body;
    
    const slug = slugify(title, { lower: true, strict: true });
    
    const careerData = {
      title,
      slug,
      description,
      content: content || description,
      location: location || '',
      department: department || '',
      type: type || 'Full-time',
      isActive: isActive !== undefined ? isActive === 'true' || isActive === true : true,
      keywords: keywords ? (Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim())) : []
    };

    if (req.file) {
      careerData.imageURL = req.file.path;
    }

    const career = new Career(careerData);
    await career.save();

    res.status(201).json(career);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Career with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update career (Admin only)
router.put('/:id', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, content, location, department, type, keywords, isActive } = req.body;
    
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    if (title && title !== career.title) {
      career.slug = slugify(title, { lower: true, strict: true });
      career.title = title;
    }

    if (description) career.description = description;
    if (content !== undefined) career.content = content;
    if (location !== undefined) career.location = location;
    if (department !== undefined) career.department = department;
    if (type) career.type = type;
    if (isActive !== undefined) career.isActive = isActive === 'true' || isActive === true;
    if (keywords) {
      career.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
    }

    if (req.file) {
      career.imageURL = req.file.path;
    }

    await career.save();
    res.json(career);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Career with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete career (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    await Career.findByIdAndDelete(req.params.id);
    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

