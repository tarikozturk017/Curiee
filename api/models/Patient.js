const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TherapistSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        // required: true
    },
    favExercises: [{ 
        type: Schema.Types.ObjectId, ref: 'Exercise' 
    }],
    patients: [{
        type: Schema.Types.ObjectId, ref: 'Patient'
    }],
    timeStamp: {
        type: String,
        default: Date.now()
    },
})

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
    creator: {
        type: Schema.Types.ObjectId, ref: 'Therapist' 
    },
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
const Therapist = mongoose.model("Therapist", TherapistSchema);


module.exports = {Patient, Exercise, Therapist};