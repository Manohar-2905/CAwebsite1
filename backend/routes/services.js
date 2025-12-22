const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const { uploadImage } = require('../utils/cloudinary');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create service (Admin only)
router.post('/', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, seoTitle, seoDescription, keywords } = req.body;
    
    const slug = slugify(title, { lower: true, strict: true });
    
    const serviceData = {
      title,
      slug,
      description,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || description.substring(0, 160),
      keywords: keywords ? (Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim())) : []
    };

    if (req.file) {
      serviceData.imageURL = req.file.path;
    }

    const service = new Service(serviceData);
    await service.save();

    res.status(201).json(service);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Service with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update service (Admin only)
router.put('/:id', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, seoTitle, seoDescription, keywords } = req.body;
    
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (title && title !== service.title) {
      service.slug = slugify(title, { lower: true, strict: true });
      service.title = title;
    }

    if (description) service.description = description;
    if (seoTitle) service.seoTitle = seoTitle;
    if (seoDescription) service.seoDescription = seoDescription;
    if (keywords) {
      service.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
    }

    if (req.file) {
      service.imageURL = req.file.path;
    }

    await service.save();
    res.json(service);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Service with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete service (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
