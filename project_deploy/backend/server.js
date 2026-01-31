require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') }); // MUST BE TOP
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
console.log("---");
console.log("SERVER VERSION: 2.0 (With Production-Only Static Serving)");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("---");

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://caweb.onrender.com",
      "http://localhost:3000",
      "http://localhost:5000"
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: "Content-Type,Authorization"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/services"));
app.use("/api/publications", require("./routes/publications"));
app.use("/api/newsroom", require("./routes/newsroom"));
app.use("/api/careers", require("./routes/careers"));
app.use("/api/career-applications", require("./routes/careerApplications"));

app.use("/api/homepage-files", require("./routes/homepageFiles"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/search", require("./routes/search"));
app.use("/sitemap.xml", require("./routes/sitemap"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/ca-consultancy",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

// Serve static files from React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  // Catch-all handler: send back React's index.html file for non-API routes
  app.get("*", (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api/") || req.path.startsWith("/sitemap.xml")) {
      return res.status(404).json({ message: "Not found" });
    }
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
