const mongoose = require("mongoose"); // Import Mongoose for database modeling

// Define the schema for users
const UserSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true // Name is mandatory
    },
    email: { 
      type: String, 
      required: true, // Email is mandatory
      unique: true // Ensures email uniqueness across users
    },
    password: { 
      type: String, 
      required: true // Password is mandatory
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("User", UserSchema); // Export the User model
