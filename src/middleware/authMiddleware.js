const jwt = require("jsonwebtoken"); // Import JWT for authentication

// Middleware function to authenticate users
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization"); // Get the token from the request headers

  // If no token is provided, return an unauthorized error
  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided" });

  try {
    // Verify and decode the token after removing "Bearer " prefix
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" }); // Handle invalid tokens
  }
};

module.exports = authenticateUser; // Export the middleware function
