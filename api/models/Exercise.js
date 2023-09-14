const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  diseaseTreatment: [
    {
      type: String,
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Therapist",
  },
  patientSatisfaction: [
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
  therapistSatisfaction: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Therapist",
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
  ],
  patientVoteCount: {
    type: Number,
    default: 0,
  },
  patientTotalVotes: {
    type: Number,
    default: 0,
  },
  therapistVoteCount: {
    type: Number,
    default: 0,
  },
  therapistTotalVotes: {
    type: Number,
    default: 0,
  },
  timeStamp: {
    type: String,
    default: Date.now(),
  },
  link: {
    type: String,
    // required: true
  },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
