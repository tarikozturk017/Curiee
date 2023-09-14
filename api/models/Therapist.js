const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const TherapistSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    // lowercase: true,
    // trim: true,
    // match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  occupation: {
    type: String,
    // required: true
  },
  profilePictureLink: {
    type: String,
    // required: true
  },
  passwordHash: {
    type: String,
    // required: true,
  },
  favExercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  rate: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
  ],
  rateCount: {
    type: Number,
    default: 0,
  },
  totalRates: {
    type: Number,
    default: 0,
  },
  patients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
  deactivatedPatients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
  timeStamp: {
    type: String,
    default: Date.now(),
  },
});

// Before saving the Therapist or Therapist document, hash the password
TherapistSchema.pre("save", async function (next) {
  const therapist = this;
  if (!therapist.isModified("passwordHash")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  therapist.passwordHash = await bcrypt.hash(therapist.passwordHash, salt);
  next();
});

const Therapist = mongoose.model("Therapist", TherapistSchema);

module.exports = Therapist;
