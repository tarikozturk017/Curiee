const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// get all exercises
router.get("/all", async (req, res) => {
  const exercises = await Exercise.find().populate("creator");
  res.json(exercises);
});

// exercise by id
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).populate("creator");

    if (exercise) res.status(200).json(exercise);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

// create a new exercise
router.post("/new", (req, res) => {
  console.log(req.body);
  const exercise = new Exercise({
    title: req.body.title,
    description: req.body.description,
    diseaseTreatment: req.body.diseaseTreatment,
    creator: req.body.therapistId,
    link: req.body.link,
  });

  exercise.save();
  res.json(exercise);
});

// delete exercise
router.delete("/:id", async (req, res) => {
  const result = await Exercise.findByIdAndDelete(req.params.id);

  res.json(result);
});

router.post("/patientRate", async (req, res) => {
  const { rating } = req.body;
  const patientId = req.body.userId;
  const { treatmentId } = req.body;

  try {
    const treatment = await Exercise.findById(treatmentId);
    // Check if the treatment exists
    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }

    // Check if the user has already voted for the treatment
    const existingVote = treatment.patientSatisfaction.find(
      (vote) => vote.user?.toString() === patientId
    );
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "Patient has already voted for this treatment" });
    }

    // Add the patient's vote to the treatment
    treatment.patientSatisfaction.push({ user: patientId, rating });

    // Update vote count and total votes
    treatment.patientVoteCount += rating;
    treatment.patientTotalVotes++;

    await treatment.save();
    res.status(200).json({ message: "Vote submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/therapistRate", async (req, res) => {
  const { rating } = req.body;
  const therapistId = req.body.userId;
  const treatmentId = req.body.treatmentId;

  try {
    const treatment = await Exercise.findById(treatmentId);
    // Check if the treatment exists
    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }

    // Check if the user has already voted for the treatment
    const existingVote = treatment.therapistSatisfaction.find(
      (vote) => vote?.user?.toString() === therapistId
    );
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "Therapist has already voted for this treatment" });
    }

    treatment.therapistSatisfaction.push({ user: therapistId, rating });

    treatment.therapistVoteCount += rating;
    treatment.therapistTotalVotes++;

    await treatment.save();
    res.status(200).json({ message: "Vote submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
