const express = require("express");
const verifyToken = require("../middleware/authMiddleware")

const router = express.Router();

router.get("/dashboard",verifyToken,(req,res) => {
    res.json({ message: "Welcome to the protected dasboard..!",
                user:req.user
    });
});

module.exports = router