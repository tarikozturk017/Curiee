const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Therapist = require("../models/Therapist");
const Exercise = require("../models/Exercise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get all the patients
router.get("/all", async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("exercises")
      .populate("therapists")
      .populate("pendingTherapists");
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/myPatients", async (req, res) => {
  const { therapistId } = req.query;
  try {
    // returns patients that has 'therapistId' in their 'therapists'
    const patients = await Patient.find({ therapists: { $in: [therapistId] } })
      .populate("exercises")
      .populate("therapists")
      .populate("pendingTherapists")
      .populate("previousTherapists");
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get deactivated therapists
router.get("/myPreviousPatients", async (req, res) => {
  const { therapistId } = req.query;
  try {
    // returns patients that has 'therapistId' in their 'therapists'
    const patients = await Patient.find({
      previousTherapists: { $in: [therapistId] },
    })
      .populate("exercises")
      .populate("therapists")
      .populate("pendingTherapists")
      .populate("previousTherapists");
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// get patient by email
router.get("/", async (req, res) => {
  const { email } = req.query;
  try {
    const patient = await Patient.findOne({ email })
      .populate("exercises")
      .populate("therapists");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/deleteExercise", async (req, res) => {
  try {
    const patient = await Patient.findById(req.body.patientId)
      .populate({ path: "exercises.exercise", model: "Exercise" })
      .populate("therapists")
      .populate("pendingTherapists");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.exercises = patient.exercises.filter(
      (exercise) => exercise.exercise !== null
    );

    await patient.save();

    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// check the password when a patient signs in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient)
      return res.status(401).json({ message: "Invalid email or password" });

    // compare the hashed password with the plaintext password
    const match = await bcrypt.compare(password, patient.passwordHash);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    /**
     * In JWT, when a user logs in, a token is generated with some user-specific data and a secret key.
     * This token is then sent back to the client-side, where it can be stored in
     * local storage or a cookie. Every subsequent request that requires authorization from the user will
     * require that the token be included in the request header.
     */
    // const secretKey = process.env.SECRET_KEY;

    // generate a JWT token and return it to the client
    const token = jwt.sign({ patientId: patient._id }, process.env.SECRET_KEY);

    delete patient.passwordHash; // make sure not sent to front-end

    res.status(200).json({ token, patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// get patient by id
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate({ path: "exercises.exercise", model: "Exercise" })
      .populate("therapists")
      .populate("pendingTherapists")
      .populate("previousTherapists");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create/register new patient
router.post("/new", (req, res) => {
  // console.log(req.body)
  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    diagnosis: req.body.diagnosis,
    profilePictureLink: req.body.profilePictureLink,
    passwordHash: req.body.password,
  });
  patient.save();
  delete patient.passwordHash;
  console.log("status sucess1");
  res.status(201).json(patient);
  console.log("status sucess2");
});

// update patient
router.put("/edit/:id", async (req, res) => {
  const result = await Patient.findById(req.params.id); // get the patient

  const exercise = await Exercise.findById(req.body.exerciseId);

  if (result.exercises.includes(exercise)) {
    console.log("Exercise is already added to the Patient");
  } else {
    result.exercises.push(exercise);
  }

  res.json(result);
  result.save();
});

// Delete patient by id
router.delete("/delete/:id", async (req, res) => {
  const result = await Patient.findByIdAndDelete(req.params.id);

  res.json(result);
});

// get all exercises of the patient
router.get("/:id/exercises", async (req, res) => {
  try {
    const exercises = await Patient.findById(req.params.id)
      .populate("exercises")
      .populate("therapists");

    if (exercises) res.status(200).json(exercises.exercises);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/sendTherapistRequest", async (req, res) => {
  const { patientId, therapistId } = req.body;
  const patient = await Patient.findById(patientId)
    .populate("therapists")
    .populate("pendingTherapists");
  const therapist = await Therapist.findById(therapistId);

  // console.log(therapist)
  const pendingTherapist = patient.pendingTherapists.find(
    (p) => p._id.toString() === therapist._id.toString()
  );
  if (pendingTherapist) {
    return res
      .status(400)
      .json({ message: "Therapist already sent a request" });
  }

  const acceptedTherapist = patient.therapists.find(
    (p) => p._id.toString() === therapist._id.toString()
  );
  if (acceptedTherapist) {
    return res
      .status(402)
      .json({ message: "Therapist is already added to the patient" });
  }

  patient.pendingTherapists.push(therapist);
  await patient.save();
  return res
    .status(200)
    .json({ message: "Therapist request sent successfully" });
});

router.put("/acceptTherapistRequest", async (req, res) => {
  const { patientId, therapistId } = req.body;
  const patient = await Patient.findById(patientId)
    .populate("therapists")
    .populate("pendingTherapists");
  const therapist = await Therapist.findById(therapistId);

  const pendingTherapist = patient.pendingTherapists.find(
    (p) => p._id.toString() === therapist._id.toString()
  );
  if (!pendingTherapist) {
    return res.status(400).json({ message: "Therapist request not found" });
  }

  patient.therapists.push(therapist);
  patient.pendingTherapists = patient.pendingTherapists.filter(
    (t) => t._id.toString() !== therapistId.toString()
  );

  await patient.save();
  // once patient accept the therapist, add the patient to the therapist's patient list
  therapist.patients.push(patient);
  await therapist.save();

  return res.status(200).json(patient);
});

router.put("/declineTherapistRequest", async (req, res) => {
  const { patientId, therapistId } = req.body;
  const patient = await Patient.findById(patientId)
    .populate("therapists")
    .populate("pendingTherapists");

  const pendingTherapist = patient.pendingTherapists.find(
    (p) => p._id.toString() === therapistId.toString()
  );
  if (!pendingTherapist) {
    return res.status(400).json({ message: "Therapist request not found" });
  }

  patient.pendingTherapists = patient.pendingTherapists.filter(
    (t) => t._id.toString() !== therapistId.toString()
  );

  await patient.save();
  // console.log('declining the request')

  return res.status(200).json(patient);
});

// add patient's fav treatment
router.post("/addTreatmentToFav", async (req, res) => {
  const patient = await Patient.findById(req.body.userId);
  const treatment = await Exercise.findById(req.body.id);

  if (treatment && patient) {
    const treatmentIndex = patient.favExercises.indexOf(treatment._id);

    if (treatmentIndex !== -1) {
      // If the treatment is already in the array, remove it
      patient.favExercises.splice(treatmentIndex, 1);
      await patient.save(); // Save the updated patient object

      return res.json({
        success: true,
        message: "Treatment removed from favorites.",
      });
    } else {
      // If the treatment is not in the array, add it
      patient.favExercises.push(treatment._id);
      await patient.save(); // Save the updated patient object

      return res.json({
        success: true,
        message: "Treatment added to favorites.",
      });
    }
  }

  return res.json({
    success: false,
    message: "Treatment or patient not found.",
  });
});

// get patient's fav treatments
router.get("/:id/retrieveFavTreatments", async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    "favExercises"
  );
  res.json(patient.favExercises);
});

module.exports = router;
