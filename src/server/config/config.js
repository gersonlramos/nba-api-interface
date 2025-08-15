/**
 * Application Configuration
 * Centralized configuration management for the NBA API application
 */

// Load environment variables from .env file
require("dotenv").config();

const config = {
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    environment: process.env.NODE_ENV || "development",
  },

  // API Configuration
  api: {
    rapidApiKey: process.env.RAPID_API_KEY,
    rapidApiHost: "api-nba-v1.p.rapidapi.com",
    baseUrl: "https://api-nba-v1.p.rapidapi.com",
  },

  // Deployment URLs
  deployment: {
    localHost: "http://localhost:3000/",
    ec2Url: process.env.EC2_URL || "http://44.211.161.65/",
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    optionsSuccessStatus: 200,
  },

  // Static Files Configuration
  static: {
    publicPath: "public",
    maxAge: process.env.NODE_ENV === "production" ? "1d" : "0",
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: process.env.NODE_ENV === "production" ? "combined" : "dev",
  },
};

// Validate required environment variables
if (!config.api.rapidApiKey) {
  console.error(
    "❌ RAPID_API_KEY is required but not set in environment variables"
  );
  process.exit(1);
}

module.exports = config;
