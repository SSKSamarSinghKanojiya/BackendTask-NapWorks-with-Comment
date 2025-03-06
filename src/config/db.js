const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction

// ==========================
// 📌 Connect to MongoDB
// ==========================
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the provided connection string
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully:", process.env.MONGO_URI);
  } catch (error) {
    // Log the error if connection fails
    console.error("❌ MongoDB Connection Error:", error);
    
    process.exit(1); // Exit the process with failure code (1)
  }
};

module.exports = connectDB; // Export the function for use in the application
