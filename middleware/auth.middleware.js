"use strict";
const jwt = require("jsonwebtoken");

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key"); // Replace with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized - Invalid token" });
  }
};

// Middleware for role-based authorization
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Forbidden - Insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRole };
