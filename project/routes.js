const nodemailer = require('nodemailer');
const express = require('express');

//model imports
const doctor = require('./models/doctor');
const patient = require('./models/patient');
const appointment = require('./models/appointment');

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

//doctor log-in
router.post('/doctor/login',async (req,res)=>{
    const _email = req.body.email;
    const _password = req.body.password;

    try {
        const doctorFound = await doctor.find({ email: _email });
        if(doctorFound.password===_password){
            res.status(200).send({email:req.body.email});
        }else{
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong!");
    }
})

//patient register
router.post('/patient/register',async (req,res)=>{
    try {
        if(Object.values(req.body).includes('')){
            res.status(400).send({message:"Something went wrong!"});
            throw new Error("Something went wrong!");
            return;
        }
        const patientFound = await patient.find({ email: req.body.email });
        if(patientFound.length>0){
            res.status(400).send({message:"Email Already in Use"});
            throw new Error("Email Already in Use");
            return;
        }
        const newEntry = new patient();
        newEntry.name = req.body.name;
        newEntry.email = req.body.email;
        newEntry.password = req.body.password;
        newEntry.address = req.body.address;
        newEntry.dob = req.body.dob;
        newEntry.phone = req.body.phone;
        newEntry.gender = req.body.gender;
        newEntry.save();
        res.status(200).send({email:req.body.email});
        return;
    } catch (err) {
        console.log(err);
        res.status(400).send({message:"Something went wrong!"});
        return;
    }
})

router.post("/delete/patients", async (req, res) => {
    try {
        await patient.deleteMany({});
        res.status(200).send('OK');
    } catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong!");
    }
});

//patient log-in
router.post('/patient/login',async (req,res)=>{
    const _email = req.body.email;
    const _password = req.body.password;

    try {
        const patientFound = await patient.find({ email: _email });
        if(patientFound.password===_password){
            res.status(200).send({email:req.body.email});
        }else{
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong!");
    }
})

router.get('/patient/all',async (req,res)=>{
    try {
        const patients = await patient.find();
        res.send(patients);
    } catch (err) {
        console.log(err);
    }
})



module.exports=router;