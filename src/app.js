require("dotenv").config(); // Load environment variables from a .env file for security and configuration.
const express = require("express"); // Import Express framework to create the server.
const connectDB = require("./config/db"); // Import database connection function.
const authRoutes = require("./routes/authRoutes"); // Import authentication-related routes.
const postRoutes = require("./routes/postRoutes"); // Import post-related routes.
const logger = require("./config/logger"); // Import logger for logging important events.
const morgan = require("morgan"); // Import Morgan for request logging.
const cors = require("cors"); // Import CORS to allow cross-origin requests.
const helmet = require("helmet"); // Import Helmet for security enhancements.
const rateLimit = require("express-rate-limit"); // Import rate limiter to prevent abuse.
const errorHandler = require("./middleware/errorMiddleware"); // Import custom error handling middleware.

const app = express();

// Connect to database
connectDB(); // Establish a connection to MongoDB to store and retrieve data.

// Middleware setup
app.use(express.json()); // Enable parsing of JSON request bodies.
app.use(cors()); // Allow cross-origin requests from the frontend.
app.use(helmet()); // Apply security headers to protect against common attacks.
app.use(morgan("combined")); // Log HTTP requests for debugging and monitoring.
app.use(errorHandler); // Handle errors in a centralized manner.

// Rate Limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Define a 15-minute time window.
  max: 100, // Limit each IP to 100 requests per time window.
  message: "Too many requests from this IP, please try again later.", // Response message when rate limit is exceeded.
});

app.use("/api", limiter); // Apply rate limiting to all API endpoints.

// Routes
app.use("/api", authRoutes); // Define authentication-related routes.
app.use("/api", postRoutes); // Define post-related routes.

// Start server
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000.
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`); // Log server startup information.
});
