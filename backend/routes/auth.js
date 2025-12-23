// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const validator = require("validator");

// // Register
// router.post("/register", async (req, res) => {
//   console.log("Register request received:", req.body);
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res
//       .status(400)
//       .json({ msg: "Please provide username and password" });
//   if (!validator.isAlphanumeric(username))
//     return res.status(400).json({ msg: "Invalid username" });
//   if (password.length < 6)
//     return res.status(400).json({ msg: "Password too short" });

//   try {
//     let user = await User.findOne({ username });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     user = new User({ username, password });
//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res
//       .status(400)
//       .json({ msg: "Please provide username and password" });

//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;

// backend/routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ user: { id } }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  console.log("Register attempt:", {
    username,
    password: password ? "***" : undefined,
  });

  try {
    // Basic required fields check
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide both username and password" });
    }

    // Username validation: letters, numbers, underscore, hyphen only; min 3 chars
    if (username.length < 3) {
      return res
        .status(400)
        .json({ msg: "Username must be at least 3 characters long" });
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return res.status(400).json({
        msg: "Username can only contain letters, numbers, underscore (_), and hyphen (-)",
      });
    }

    // Password length check
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user (password will be hashed automatically via pre-save hook in User model)
    const user = new User({ username, password });
    await user.save();

    console.log("User registered successfully:", username);

    // Generate and send JWT token
    const token = generateToken(user.id);
    res.json({ token });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", { username });

  try {
    // Check required fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide both username and password" });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Login successful:", username);

    // Generate and send JWT token
    const token = generateToken(user.id);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
