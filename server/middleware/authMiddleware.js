const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) =>{ 
    const authHeader = req.header("Authorization");

    if(!authHeader) return res.status(401).json({
        error:"Access Denied. No Token."
    });

    const token = authHeader.split(" ")[1];

    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch (err) {
        res.status(400).json({
            error:"Invalid Token."
        });
    }
};

module.exports = verifyToken