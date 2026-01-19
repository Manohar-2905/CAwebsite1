const express = require('express');
const router = express.Router();
const Sector = require('../models/Sector');
const auth = require('../middleware/auth');
const { uploadImage } = require('../utils/cloudinary');

// Get all sectors
router.get('/', async (req, res) => {
  try {
    const sectors = await Sector.find().sort({ order: 1, createdAt: 1 });
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create sector (Admin only)
router.post('/', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, icon, order } = req.body;
    
    const sectorData = {
      title: title ? title.trim() : '',
      description: description ? description.trim() : '',
      icon: icon ? icon.trim() : 'Briefcase', // Default icon
      order: order || 0
    };

    if (req.file) {
      sectorData.imageURL = req.file.path;
    }

    const sector = new Sector(sectorData);
    await sector.save();
    res.status(201).json(sector);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update sector (Admin only)
router.put('/:id', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, icon, order } = req.body;
    
    const sector = await Sector.findById(req.params.id);
    if (!sector) {
      return res.status(404).json({ message: 'Sector not found' });
    }

    if (title) sector.title = title.trim();
    if (description) sector.description = description.trim();
    if (icon) sector.icon = icon.trim();
    if (order !== undefined) sector.order = order;

    if (req.file) {
      sector.imageURL = req.file.path;
    }

    await sector.save();
    res.json(sector);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete sector (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);
    if (!sector) {
      return res.status(404).json({ message: 'Sector not found' });
    }

    await Sector.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sector deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
