const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
    passwordHash: {
        type: String,
        // required: true,
    },
   timeStamp: {
        type: String,
        default: Date.now()
    },
})

// Before saving the Therapist or Patient document, hash the password
// TherapistSchema.pre('save', async function (next) {
//     const therapist = this;
//     if (!therapist.isModified('passwordHash')) {
//       return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     therapist.passwordHash = await bcrypt.hash(therapist.passwordHash, salt);
//     next();
//   });
  
// this is a middleware function that runs before saving the document to the DB
// check if the passwordHash field has been modified
PatientSchema.pre('save', async function (next) {
    const patient = this;
    if (!patient.isModified('passwordHash')) { // checking to avoid unnecessary hashing.
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    patient.passwordHash = await bcrypt.hash(patient.passwordHash, salt);
    next(); // these 'next's skips to the 'save'
});

// Define a method on the Therapist and Patient models to compare a password with its hashed version
TherapistSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };
  
//The comparePassword method is a function that we're adding to the PatientSchema using the methods object.
//This function takes a password as its argument and compares it with the hashed version of the password stored in the database.
//bcrypt.compare() function to compare the plain text password with the hashed password stored in the database.
//We're returning this promise from the comparePassword() function, so 
//we can use await to wait for the result of the comparison in our login function.
PatientSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

const Patient = mongoose.model("Patient", PatientSchema);
const Exercise = mongoose.model("Exercise", ExerciseSchema);
const Therapist = mongoose.model("Therapist", TherapistSchema);


module.exports = {Patient, Exercise, Therapist};