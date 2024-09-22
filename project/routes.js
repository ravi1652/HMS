const nodemailer = require('nodemailer');
const express = require('express');

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Express + MongoDB");
});

const otpStore = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ravikiran1652238@gmail.com', // replace with your email
        pass: 'qamwdiuzlersrpjo' // replace with your app password
    }
});

router.post('/send-otp', (req, res) => {
    const email = req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const mailOptions = {
        from: 'your-email@gmail.com', // replace with your email
        to: email,
        subject: 'Your OTP Code',
        text: `Thankyou for choosing AccureHealth, \n Please enter the provided otp. \n if it's not you ignore ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending OTP');
        }
        res.status(200).send('OTP sent');
    });
});

router.post('/verify-otp', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    if (otpStore[email] && otpStore[email] === otp) {
        delete otpStore[email];
        res.status(200).send('OTP Verified');
    } else {
        res.status(400).send('Invalid OTP');
    }
});


module.exports=router;