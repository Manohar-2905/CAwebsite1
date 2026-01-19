// Script to import services from PDF
// Usage: node scripts/importServices.js <path-to-pdf>

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { extractServicesFromPDF, convertToSeedData } = require('../utils/pdfImporter');
const Service = require('../models/Service');
const slugify = require('slugify');

dotenv.config();

async function importServices(pdfPath) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ca-consultancy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Extract services from PDF
    const services = await extractServicesFromPDF(pdfPath);
    const seedData = convertToSeedData(services);

    // Import to database
    let imported = 0;
    let skipped = 0;

    for (const serviceData of seedData) {
      try {
        // Check if service already exists
        const existing = await Service.findOne({ slug: serviceData.slug });
        if (existing) {
          console.log(`Skipping existing service: ${serviceData.title}`);
          skipped++;
          continue;
        }

        const service = new Service(serviceData);
        await service.save();
        console.log(`Imported: ${serviceData.title}`);
        imported++;
      } catch (error) {
        console.error(`Error importing ${serviceData.title}:`, error.message);
      }
    }

    console.log(`\nImport complete!`);
    console.log(`Imported: ${imported}`);
    console.log(`Skipped: ${skipped}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Import error:', error);
    process.exit(1);
  }
}

// Get PDF path from command line
const pdfPath = process.argv[2];

if (!pdfPath) {
  console.error('Usage: node scripts/importServices.js <path-to-pdf>');
  process.exit(1);
}

importServices(pdfPath);
