const express = require("express");
const Project = require("../models/Project");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Add Project (POST)
router.post("/add", verifyToken, async (req, res) => {
  try {
    const newProject = new Project({
      ...req.body,
      userId:req.user.id
  });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add project" });
  }
});


// get My-Projects
router.get("/my-projects",verifyToken,async(req,res) => {
  try{
    const projects = await Project.find({
      userId:req.user.id
    }).sort({createdAt: -1});
    res.json(projects);
  } catch (err) {
    res.status(500).json({
      error:"Failed to fetch projects"
    });
  }
});


// Get All Projects (GET)
router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;