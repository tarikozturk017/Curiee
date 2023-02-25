const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        default: Date.now()
    },
})

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;