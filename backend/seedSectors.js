require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require("mongoose");
const Sector = require("./models/Sector");

const sectors = [
    { title: "Banking and Non Banking Finance Companies", icon: "FaUniversity", description: "Comprehensive audit and advisory for financial institutions." },
    { title: "Private Equity and Venture Capital", icon: "FaChartLine", description: "Strategic financial consulting for investment firms." },
    { title: "Manufacturing", icon: "FaIndustry", description: "Optimizing production and supply chain finance." },
    { title: "Retail", icon: "FaShoppingBag", description: "Solutions for retail chains and consumer businesses." },
    { title: "Real Estate and Infrastructure", icon: "FaBuilding", description: "Compliance and taxation for real estate developers." },
    { title: "Dealerships and Franchisees", icon: "FaHandshake", description: "Financial management for dealer networks." },
    { title: "Power", icon: "FaBolt", description: "Regulatory advisory for the power and energy sector." },
    { title: "Non-Ferrous metals", icon: "FaLayerGroup", description: "Specialized services for the metals industry." },
    { title: "Iron and Steel", icon: "FaCube", description: "Audit and assurance for steel manufacturing." },
    { title: "Automobile", icon: "FaCar", description: "Taxation and consulting for the auto industry." },
    { title: "Forging", icon: "FaHammer", description: "Industrial financial planning and compliance." },
    { title: "Engineering", icon: "FaCogs", description: "Support for engineering and construction firms." },
    { title: "Non Governmental Organisations (NGO)", icon: "FaHandHoldingHeart", description: "Grant management and compliance for NGOs." },
    { title: "Pharmaceuticals", icon: "FaPrescriptionBottleAlt", description: "Regulatory guidance for pharma companies." },
    { title: "Fast Moving Consumer Goods (FMCG)", icon: "FaShoppingCart", description: "Supply chain and inventory audit for FMCG." },
    { title: "Oil & Gas", icon: "FaBurn", description: "Energy sector financial consulting." },
    { title: "Mining", icon: "FaGem", description: "Compliance and risk management for mining." },
    { title: "Plantations and Agriculture", icon: "FaTractor", description: "Agri-business financial services." },
    { title: "Insurance", icon: "FaShieldAlt", description: "Audit and regulatory services for insurers." },
    { title: "Hotel, Tourism & Leisure", icon: "FaPlane", description: "Financial strategy for the hospitality sector." }
];

const seedSectors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ca-consultancy", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    await Sector.deleteMany({});
    console.log("Existing sectors cleared");

    await Sector.insertMany(sectors);
    console.log("Sectors inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding sectors:", error);
    process.exit(1);
  }
};

seedSectors();
