const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors({
    origin: 'https://eazybytes-cms-project.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Contact Routes
const contactRoutes = require("./routes/contact");
app.use("/api/contact",contactRoutes)

// Project Routes
const projectRoutes = require("./routes/project");
app.use("/api/project",projectRoutes)


// Auth Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth",authRoutes);

// Dasboard Routes
const dashboardRoutes = require("./routes/dashboard");
app.use("/api",dashboardRoutes)

// Sample route
app.get("/", (req, res) => {
  res.send("EazyBytes Backend is Live! 🚀");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

