const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    doctorId: { required: true, type: String },
    patientId: { required: true, type: String },
    time: { required: true, type: String },
    date: { required: true, type: String },
    symptoms: { required: true, type: String },
});

module.exports =  mongoose.model("appointment", appointmentSchema, "appointment");
