const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    diseaseTreatment: [{
        type: String
    }],
    timeStamp: {
        type: String,
        default: Date.now()
    },
})

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
    exercises: [{ 
        type: Schema.Types.ObjectId, ref: 'Exercise' 
    }],
   timeStamp: {
        type: String,
        default: Date.now()
    },
})


const Patient = mongoose.model("Patient", PatientSchema);
const Exercise = mongoose.model("Exercise", ExerciseSchema);


module.exports = {Patient, Exercise};