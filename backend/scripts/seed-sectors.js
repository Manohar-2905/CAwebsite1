require('dotenv').config();
const mongoose = require('mongoose');
const Sector = require('../models/Sector');

const sectors = [
  { 
    title: "Banking & Finance", 
    icon: "Landmark", 
    description: "Comprehensive audit and assurance services for banks and NBFCs.",
    order: 1
  },
  { 
    title: "Private Equity", 
    icon: "Banknote", 
    description: "Valuation and due diligence for private equity and venture capital firms.",
    order: 2
  },
  { 
    title: "Manufacturing", 
    icon: "Factory", 
    description: "End-to-end accounting and tax solutions for the manufacturing sector.",
    order: 3
  },
  { 
    title: "Retail", 
    icon: "ShoppingBag", 
    description: "Inventory management and GST compliance for retail chains.",
    order: 4
  },
  { 
    title: "Real Estate", 
    icon: "Building2", 
    description: "RERA compliance and financial structuring for real estate projects.",
    order: 5 
  },
  { 
    title: "Power & Energy", 
    icon: "Zap", 
    description: "Specialized consulting for power generation and distribution companies.",
    order: 6
  },
  { 
    title: "Technology", 
    icon: "Cpu", 
    description: "Financial strategy and compliance for IT and tech startups.",
    order: 7
  },
  { 
    title: "Healthcare", 
    icon: "Stethoscope", 
    description: "Audit and advisory services for hospitals and pharmaceutical companies.",
    order: 8
  },
  { 
    title: "Tourism & Hospitality", 
    icon: "Plane", 
    description: "Accounting and tax planning for hotels and travel agencies.",
    order: 9
  },
  { 
    title: "Logistics", 
    icon: "Truck", 
    description: "Supply chain finance and operational efficiency consulting.",
    order: 10
  },
  { 
    title: "Insurance", 
    icon: "Shield", 
    description: "Risk assessment and regulatory compliance for insurance providers.",
    order: 11
  },
  { 
    title: "Mining & Metals", 
    icon: "Gem", 
    description: "Statutory audit and taxation for mining and metal industries.",
    order: 12
  }
];

const seedSectors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Sector.deleteMany({});
    console.log('Cleared existing sectors');

    await Sector.insertMany(sectors);
    console.log('Seeded sectors successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding sectors:', error);
    process.exit(1);
  }
};

seedSectors();
