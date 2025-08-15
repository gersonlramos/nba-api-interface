/**
 * NBA API Server
 * Main server file with improved structure and configuration
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config/config");

const app = express();

// Import routes
const nbaRoutes = require("./routes/nbaRoutes");

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/nba", nbaRoutes);

// Static files - serve from public directory
const publicPath = path.join(__dirname, "..", config.static.publicPath);
app.use(express.static(publicPath, { maxAge: config.static.maxAge }));

// Routes for HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/team", (req, res) => {
  res.sendFile(path.join(publicPath, "pages", "team.html"));
});

app.get("/compare", (req, res) => {
  res.sendFile(path.join(publicPath, "pages", "compare.html"));
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message:
      config.server.environment === "development"
        ? err.message
        : "Something went wrong",
  });
});

// Start server
const { port, host } = config.server;
app.listen(port, () => {
  console.log(`🏀 NBA API Server running at http://${host}:${port}`);
  console.log(`📁 Serving static files from: ${publicPath}`);
  console.log(`🌍 Environment: ${config.server.environment}`);
});
