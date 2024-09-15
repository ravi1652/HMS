const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const otpStore = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ravikiran1652238@gmail.com', // replace with your email
        pass: 'qamwdiuzlersrpjo' // replace with your app password
    }
});

app.post('/send-otp', (req, res) => {
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

app.post('/verify-otp', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    if (otpStore[email] && otpStore[email] === otp) {
        delete otpStore[email];
        res.status(200).send('OTP Verified');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});