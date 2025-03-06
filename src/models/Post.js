const mongoose = require("mongoose"); // Import Mongoose for database modeling

// Define the schema for posts
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Store the ID of the user who created the post
      ref: "User", // Reference to the User model for relational mapping
      required: true, // Ensure every post has an associated user
    },
    postName: { 
      type: String, 
      required: true // Post name is mandatory
    },
    description: { 
      type: String, 
      required: true // Description is mandatory
    },
    uploadTime: { 
      type: Date, 
      default: Date.now // Automatically set upload time to the current date/time
    },
    tags: [{ 
      type: String // Optional array of tags for categorization
    }],
    imageUrl: { 
      type: String // Optional URL to an image related to the post
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Post", PostSchema); // Export the Post model
