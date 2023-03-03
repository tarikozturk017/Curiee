const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const PatientSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        // lowercase: true,
        // trim: true,
        // match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    diagnosis: {
        type: String,
        // required: true
    },
    exercises: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Exercise' 
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

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;