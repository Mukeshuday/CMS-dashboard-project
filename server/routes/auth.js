const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check, if user exists
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({
        error:"User already exists.."
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // generate token
    const token = jwt.sign({id:newUser._id},
      process.env.JWT_SECRET, {expiresIn:"1d"}
    );

    res.status(201).json({
      token,
      user: {
        id:newUser._id,
        username:newUser.username,
        email:newUser.email
      }
    });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error:"Registation failed"
      });
    }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;