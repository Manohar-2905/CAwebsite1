const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Publication = require('../models/Publication');

router.get('/', async (req, res) => {
  try {
    const query = req.query.q || '';
    
    if (!query) {
      return res.json({ services: [], publications: [] });
    }

    const searchRegex = new RegExp(query, 'i');

    // Search in services
    const services = await Service.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { keywords: { $in: [searchRegex] } }
      ]
    }).select('title slug description imageURL');

    // Search in publications
    const publications = await Publication.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { keywords: { $in: [searchRegex] } }
      ]
    }).select('title slug description fileURL');

    res.json({ services, publications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
