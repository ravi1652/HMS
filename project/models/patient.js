const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new Schema({
    email: { required: true, type: String },
    password: { required: true, type: String },
    name: { required: true, type: String },
    address: { required: true, type: String },
    dob: { required: true, type: String },
    phone: { required: true, type: String },
    gender: { required:true, type: String },
});

module.exports =  mongoose.model("patient", patientSchema, "patient");
