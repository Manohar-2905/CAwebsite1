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
// CORS configuration - Allow requests from frontend domain
// Normalize URLs by removing trailing slashes
const normalizeUrl = (url) => {
  if (!url) return null;
  return url.replace(/\/+$/, '');
};

const allowedOrigins = [
  normalizeUrl(process.env.FRONTEND_URL),
  "https://dasguptamaitiassociates.com",
  "https://www.dasguptamaitiassociates.com",
  "http://localhost:3000",
  "http://localhost:5000"
].filter(Boolean);

console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("CORS: Request with no origin, allowing");
        return callback(null, true);
      }
      
      // Normalize origin by removing trailing slash
      const normalizedOrigin = normalizeUrl(origin);
      
      // Check if origin is in allowed list
      if (allowedOrigins.indexOf(normalizedOrigin) !== -1) {
        console.log("CORS: Allowing origin:", normalizedOrigin);
        callback(null, true);
      } else {
        // Log for debugging
        console.log("CORS: Blocked origin:", normalizedOrigin);
        console.log("CORS: Allowed origins are:", allowedOrigins);
        // In production, be more permissive for debugging
        if (process.env.NODE_ENV === "production") {
          console.log("CORS: Production mode - allowing origin for debugging");
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers"
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    preflightContinue: false,
    optionsSuccessStatus: 204
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
  // Serve static files with fallthrough option
  app.use(express.static(path.join(__dirname, "../frontend/build"), { fallthrough: true }));

  // Catch-all handler: send back React's index.html file for non-API routes
  // This must be after all other routes
  app.get("*", (req, res, next) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api/") || req.path.startsWith("/sitemap.xml")) {
      return res.status(404).json({ message: "Not found" });
    }
    // Serve index.html for all other routes (client-side routing)
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
