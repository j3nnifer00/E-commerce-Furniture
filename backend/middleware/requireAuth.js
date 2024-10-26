// File to protect the api routes

// Models
const { User } = require("../models/userModel.js");

// Packages
const jwt = require("jsonwebtoken");

// Middleware functions
const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  // Check if there is a user token
  if (!authorization) {
    return res.status(403).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1]; // Get token from the header which is a string example 'bearer {token}'

  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT secret key is not defined');
    }
    
    const { userId } = jwt.verify(token, process.env.JWT_KEY); // Verify the token
    req.user = await User.findOne({ _id: userId }).select("_id isAdmin"); // Find the user id only

    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error); // Improved logging
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
