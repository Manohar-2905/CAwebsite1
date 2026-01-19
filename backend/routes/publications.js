const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Publication = require('../models/Publication');
const auth = require('../middleware/auth');
const { uploadMixed } = require('../utils/cloudinary');

// Dedicated middleware so we consistently capture both PDF (file) and image fields
const uploadPublicationFiles = uploadMixed.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

// Get all publications
router.get('/', async (req, res) => {
  try {
    const publications = await Publication.find().sort({ createdAt: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single publication by slug
router.get('/:slug', async (req, res) => {
  try {
    const publication = await Publication.findOne({ slug: req.params.slug });
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create publication (Admin only)
router.post('/', auth, uploadPublicationFiles, async (req, res) => {
  try {
    const { title, description, keywords } = req.body;

    // Find PDF file in req.files (Cloudinary stores on req.files.<field>)
    const pdfFile = req.files?.file?.[0];
    
    if (!pdfFile) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const publicationData = {
      title,
      slug,
      description,
      fileURL: pdfFile.secure_url || pdfFile.path,
      keywords: keywords ? (Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim())) : []
    };

    // Find image file
    const imageFile = req.files?.image?.[0];
    if (imageFile) {
      publicationData.imageURL = imageFile.secure_url || imageFile.path;
    }

    const publication = new Publication(publicationData);

    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Publication with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update publication (Admin only)
router.put('/:id', auth, uploadPublicationFiles, async (req, res) => {
  try {
    const { title, description, keywords } = req.body;

    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    if (title && title !== publication.title) {
      publication.slug = slugify(title, { lower: true, strict: true });
      publication.title = title;
    }

    if (description) publication.description = description;
    if (keywords) {
      publication.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
    }

    if (req.files) {
      // Find PDF file
      const pdfFile = req.files.file?.[0];
      if (pdfFile) {
        publication.fileURL = pdfFile.secure_url || pdfFile.path;
      }

      // Find image file
      const imageFile = req.files.image?.[0];
      if (imageFile) {
        publication.imageURL = imageFile.secure_url || imageFile.path;
      }
    }

    await publication.save();
    res.json(publication);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Publication with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete publication (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    await Publication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;