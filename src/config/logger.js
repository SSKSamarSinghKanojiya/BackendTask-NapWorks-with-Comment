const { createLogger, format, transports } = require("winston"); // Import Winston logging utilities
const path = require("path"); // Import path module for file path handling
const fs = require("fs"); // Import file system module for directory operations

// ==========================
// 📌 Ensure Logs Directory Exists
// ==========================
const logDir = "logs"; // Define the log directory name
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir); // Create the directory if it doesn't exist
}

// ==========================
// 📌 Create Winston Logger
// ==========================
const logger = createLogger({
  level: "info", // Set logging level (logs "info" and higher)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp to logs
    format.json() // Format logs as JSON
  ),
  transports: [
    new transports.Console(), // Log messages to the console
    new transports.File({ filename: path.join(logDir, "app.log") }), // Store logs in a file
  ],
});

module.exports = logger; // Export the logger for use in other modules
