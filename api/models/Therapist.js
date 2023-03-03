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
        type: Schema.Types.ObjectId,
        ref: 'Exercise' 
    }],
    patients: [{
        type: Schema.Types.ObjectId, 
        ref: 'Patient'
    }],
    timeStamp: {
        type: String,
        default: Date.now()
    },
})
  
// Before saving the Therapist or Patient document, hash the password
TherapistSchema.pre('save', async function (next) {
    const therapist = this;
    if (!therapist.isModified('passwordHash')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    therapist.passwordHash = await bcrypt.hash(therapist.passwordHash, salt);
    next();
  });

const Therapist = mongoose.model("Therapist", TherapistSchema);

module.exports = Therapist;