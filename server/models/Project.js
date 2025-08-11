const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

  userId:{
  type: mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  liveLink: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);