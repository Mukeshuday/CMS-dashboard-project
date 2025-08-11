const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

router.post("/send",async(req,res) => {
    const {name,email,message} = req.body;

    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            secure:true,
            tls:{
                rejectUnauthorized:false,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.MAIL_USER,
            subject:`Portfolio Contact form ${name}`,
            text:`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message},`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({message:"Message sent succesfully!"});
    } catch (err) {
        console.error("Mail Error:",err);
        res.status(500).json({error: "Failed to send message."});
    }
});

module.exports = router;