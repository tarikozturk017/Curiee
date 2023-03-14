const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const Patient = require('../models/Patient');
const Exercise = require('../models/Exercise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// get all therapists
router.get('/all', async (req, res) => {
    const therapists = await Therapist.find();
    res.json(therapists);
})

// get therapist by id
router.get('/:id', async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id)
        .populate('favExercises')
        .populate('patients');
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    res.json(therapist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// therapist login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const therapist = await Therapist.findOne({ email });
      if (!therapist) return res.status(401).json({ message: 'Invalid email or password' });
  
      // compare the hashed password with the plaintext password
      const match = await bcrypt.compare(password, therapist.passwordHash);
      if (!match) return res.status(401).json({ message: 'Invalid email or password' });
  
      /**
       * In JWT, when a user logs in, a token is generated with some user-specific data and a secret key. 
       * This token is then sent back to the client-side, where it can be stored in 
       * local storage or a cookie. Every subsequent request that requires authorization from the user will 
       * require that the token be included in the request header.
       */
      const secretKey = process.env.SECRET_KEY;

      // generate a JWT token and return it to the client
      const token = jwt.sign({ therapistId: therapist._id }, secretKey);

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// Create/register new therapist
router.post('/new', (req, res) => {
    console.log(req.body)
    const patient = new Therapist({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        occupation: req.body.occupation,
        passwordHash: req.body.password
    })

    patient.save();
    res.json(patient)
})

// Assign exercise to
router.post('/assignExerciseToPatient', async (req, res) => {
  const patient = await Patient.findById(req.body.patientId);
  const therapist = await Therapist.findById(req.body.therapistId);
  const exercise = await Exercise.findById(req.body.exerciseId);
  const repetition = req.body.repetition ? req.body.repetition : 0;
  const note = req.body.note ? req.body.note : 'No notes assigned';

  // This code checks if at least one Therapist instance in patient.therapists 
  // has the same _id as the therapist object. If the condition is true handles rest.
  if (patient.therapists.some(t => t._id.toString() === therapist._id.toString())) {
    patient.exercises.push({
      exercise: exercise,
      repetition: repetition,
      note: note
    })
  }
  
  patient.save();
  res.json(patient)
})


// update therapist
router.put('/edit/:id', async (req, res) => {
    const result = await Therapist.findById(req.params.id); // get the therapist

    const patient = await Patient.findById(req.body.patientId);
    
    if(result.patients.includes(patient)){
        console.log('Patient is already added to the Therapist')
    } else {
        result.patients.push(patient)
    }
    
    res.json(result)
    result.save();
})

// Delete therapist by id
router.delete('/delete/:id', async (req, res) => {
    const result = await Therapist.findByIdAndDelete(req.params.id);

    res.json(result);
})

// deactivate patient
router.put('/deactivatePatient', async (req, res) => {
  const therapist = await Therapist.findById(req.body.therapistId).populate('patients').populate('deactivatedPatients').lean()
  const patient = await Patient.findById(req.body.patientId).populate('therapists').populate('previousTherapists').lean()

  // Remove patient from therapist's patients array
  const index = therapist.patients.findIndex(p => p._id.equals(req.body.patientId))
  if (index > -1) {
    therapist.patients.splice(index, 1)
    // Add patient to therapist's deactivatedPatients array
    therapist.deactivatedPatients.push(patient)
  }

  // Remove therapist from patient's therapists array
  const therapistIndex = patient.therapists.findIndex(t => t._id.equals(req.body.therapistId))
  if (therapistIndex > -1) {
    patient.therapists.splice(therapistIndex, 1)
    patient.previousTherapists.push(therapist)
  }

  // Save therapist and patient documents
  await Therapist.findByIdAndUpdate(req.body.therapistId, therapist)
  await Patient.findByIdAndUpdate(req.body.patientId, patient)

  res.json({ success: true })
})



module.exports = router;