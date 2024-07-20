const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/userModal");
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to generate authentication tokens
const generateAuthTokens = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ _id: user._id, role: user.userRole }, JWT_SECRET, {
    expiresIn: "24h"
  });
  res.status(200).json({ message: "Authenticated successfully", token });
};

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Middleware to verify JWT
const verifyToken = passport.authenticate("jwt", { session: false });

// Middleware function to check user role
const verifyRole = (roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.userRole)) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  };
};

module.exports = {
  generateAuthTokens,
  isAuthenticated,
  verifyToken,
  verifyRole
};