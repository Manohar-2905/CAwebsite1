// PDF Import Utility
// This utility helps extract services from a PDF file
// Note: For production, you may want to use a PDF parsing library like pdf-parse

const fs = require('fs');
let pdf;

try {
  pdf = require('pdf-parse');
} catch (error) {
  console.warn('pdf-parse not installed. Run: npm install pdf-parse');
  pdf = null;
}

/**
 * Extract services from PDF file
 * @param {string} pdfPath - Path to the PDF file
 * @returns {Promise<Array>} Array of service objects
 */
async function extractServicesFromPDF(pdfPath) {
  if (!pdf) {
    throw new Error('pdf-parse is not installed. Please run: npm install pdf-parse');
  }
  
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    // Parse the text content
    const text = data.text;
    
    // This is a basic parser - you may need to customize based on your PDF structure
    const services = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    let currentService = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect service titles (customize this pattern based on your PDF)
      if (line.match(/^[A-Z][A-Z\s&]+$/)) {
        if (currentService) {
          services.push(currentService);
        }
        currentService = {
          title: line,
          description: '',
          keywords: []
        };
      } else if (currentService && line.length > 20) {
        // Add to description
        currentService.description += (currentService.description ? ' ' : '') + line;
      }
    }
    
    if (currentService) {
      services.push(currentService);
    }
    
    return services;
  } catch (error) {
    console.error('Error extracting services from PDF:', error);
    throw error;
  }
}

/**
 * Convert services array to MongoDB seed data
 * @param {Array} services - Array of service objects
 * @returns {Array} MongoDB seed data
 */
function convertToSeedData(services) {
  const slugify = require('slugify');
  
  return services.map(service => ({
    title: service.title,
    slug: slugify(service.title, { lower: true, strict: true }),
    description: service.description || 'Service description',
    imageURL: '',
    seoTitle: service.title,
    seoDescription: service.description?.substring(0, 160) || '',
    keywords: extractKeywords(service.title, service.description),
    createdAt: new Date(),
    updatedAt: new Date()
  }));
}

/**
 * Extract keywords from title and description
 */
function extractKeywords(title, description) {
  const commonKeywords = [
    'CA services', 'Audit', 'Assurance', 'Tax', 'GST', 'ROC', 'Compliance',
    'Company Registration', 'ITR', 'Financial Consulting', 'Chartered Accountant'
  ];
  
  const text = `${title} ${description}`.toLowerCase();
  const foundKeywords = commonKeywords.filter(keyword => 
    text.includes(keyword.toLowerCase())
  );
  
  return foundKeywords.length > 0 ? foundKeywords : ['CA services'];
}

/**
 * Generate seed file
 */
async function generateSeedFile(pdfPath, outputPath) {
  const services = await extractServicesFromPDF(pdfPath);
  const seedData = convertToSeedData(services);
  
  const seedFile = `// Auto-generated seed file from PDF
const services = ${JSON.stringify(seedData, null, 2)};

module.exports = services;
`;
  
  fs.writeFileSync(outputPath, seedFile);
  console.log(`Seed file generated: ${outputPath}`);
  console.log(`Extracted ${services.length} services`);
  
  return seedData;
}

module.exports = {
  extractServicesFromPDF,
  convertToSeedData,
  generateSeedFile
};
