const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
    email: { required: true, type: String },
    password: { required: true, type: String },
});

module.exports =  mongoose.model("doctor", doctorSchema, "doctor");
