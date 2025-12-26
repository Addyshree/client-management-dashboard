const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const auth = require("../middleware/auth");
const validator = require("validator");

// Get all clients
router.get("/", auth, async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// // Add client
// router.post("/", auth, async (req, res) => {
//   const { name, email, company, phone } = req.body;
//   if (!name || !email || !company || !phone)
//     return res.status(400).json({ msg: "All fields required" });
//   if (!validator.isEmail(email))
//     return res.status(400).json({ msg: "Invalid email" });
//   if (!validator.isMobilePhone(phone))
//     return res.status(400).json({ msg: "Invalid phone" });

//   try {
//     const client = new Client({ name, email, company, phone });
//     await client.save();
//     res.json(client);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Update client
// router.put("/:id", auth, async (req, res) => {
//   const { name, email, company, phone } = req.body;
//   if (!name || !email || !company || !phone)
//     return res.status(400).json({ msg: "All fields required" });
//   if (!validator.isEmail(email))
//     return res.status(400).json({ msg: "Invalid email" });
//   if (!validator.isMobilePhone(phone))
//     return res.status(400).json({ msg: "Invalid phone" });

//   try {
//     const client = await Client.findByIdAndUpdate(
//       req.params.id,
//       { name, email, company, phone },
//       { new: true }
//     );
//     if (!client) return res.status(404).json({ msg: "Client not found" });
//     res.json(client);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// Add client
router.post("/", auth, async (req, res) => {
  const {
    name,
    email,
    company,
    phone,
    status,
    serviceType,
    industry,
    location,
  } = req.body;

  // Basic required field check (you can make others optional)
  if (!name || !email || !company || !phone) {
    return res
      .status(400)
      .json({ msg: "Name, email, company, and phone are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "Invalid email" });
  }

  if (!validator.isMobilePhone(phone, "any")) {
    // 'any' allows international formats
    return res.status(400).json({ msg: "Invalid phone number" });
  }

  try {
    const client = new Client({
      name,
      email,
      company,
      phone,
      status,
      serviceType,
      industry,
      location,
    });
    await client.save();
    res.json(client);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

// Update client
router.put("/:id", auth, async (req, res) => {
  const {
    name,
    email,
    company,
    phone,
    status,
    serviceType,
    industry,
    location,
  } = req.body;

  // Allow partial updates — only validate what's provided
  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ msg: "Invalid email" });
  }
  if (phone && !validator.isMobilePhone(phone, "any")) {
    return res.status(400).json({ msg: "Invalid phone number" });
  }

  try {
    const updates = {
      name,
      email,
      company,
      phone,
      status,
      serviceType,
      industry,
      location,
    };

    // Remove undefined fields so they aren't overwritten with undefined
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const client = await Client.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!client) return res.status(404).json({ msg: "Client not found" });

    res.json(client);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete client
router.delete("/:id", auth, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ msg: "Client not found" });
    res.json({ msg: "Client deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
