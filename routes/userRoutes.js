// userRoutes.js

const express = require('express');
const router = express.Router();
const { Snowflake } = require("@theinternetfolks/snowflake");
const User = require('../models/User');

// Route to sign up a new user
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = Snowflake.generate(); // Generate unique Snowflake ID
    const user = await User.create({ id: userId, name, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

// Route to sign in a user
router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if user with the provided email exists in the database
    const user = await User.findOne({ email });

    // If user doesn't exist or password doesn't match, return error
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // If email and password match, sign in successful
    res.status(200).json({ success: true, message: "Sign in successful" });
  } catch (error) {
    next(error);
  }
});

// Route to get current user details
router.get('/me', async (req, res, next) => {
  try {
    // Get user ID from request headers or authentication token
    const userId = req.headers.user_id;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Return user details
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
