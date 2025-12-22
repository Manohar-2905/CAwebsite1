const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage configuration for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ca-consultancy/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }]
  }
});

// Storage configuration for PDFs
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ca-consultancy/files',
    resource_type: 'auto',
    allowed_formats: ['pdf']
  }
});

const uploadImage = multer({ storage: imageStorage });
const uploadPDF = multer({ storage: pdfStorage });
const uploadMemory = multer({ storage: multer.memoryStorage() });

// Storage configuration for mixed files (Publications cover + pdf)
const mixedStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith('image');
    return {
      folder: isImage ? 'ca-consultancy/images' : 'ca-consultancy/files',
      resource_type: isImage ? 'image' : 'raw', // use raw for PDFs so they serve directly
      allowed_formats: isImage ? ['jpg', 'jpeg', 'png', 'webp'] : ['pdf'],
    };
  },
});

const uploadMixed = multer({ storage: mixedStorage });

module.exports = {
  cloudinary,
  uploadImage,
  uploadPDF,
  uploadMemory,
  uploadMixed
};
