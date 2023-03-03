const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// get all the patients
router.get('/all', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
})

router.get('/', async (req, res) => {
    const { email } = req.query;
    try {
      const patient = await Patient.findOne({ email }).populate('exercises');
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
// check the password when a patient signs in
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const patient = await Patient.findOne({ email });
      if (!patient) return res.status(401).json({ message: 'Invalid email or password' });
  
      // compare the hashed password with the plaintext password
      const match = await bcrypt.compare(password, patient.passwordHash);
      if (!match) return res.status(401).json({ message: 'Invalid email or password' });
  
      /**
       * In JWT, when a user logs in, a token is generated with some user-specific data and a secret key. 
       * This token is then sent back to the client-side, where it can be stored in 
       * local storage or a cookie. Every subsequent request that requires authorization from the user will 
       * require that the token be included in the request header.
       */
      const secretKey = process.env.SECRET_KEY;

      // generate a JWT token and return it to the client
      const token = jwt.sign({ patientId: patient._id }, secretKey);

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// get patient by id
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id); // get the patient
    
        if(patient)  res.status(200).json(patient);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
      }
})

// Create new patient
router.post('/new', (req, res) => {
    console.log(req.body)
    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        diagnosis: req.body.diagnosis,
        passwordHash: req.body.password

    })

    patient.save();
    res.json(patient)
})

// update patient
router.put('/edit/:id', async (req, res) => {
    const result = await Patient.findById(req.params.id); // get the patient

    const exercise = await Exercise.findById(req.body.exerciseId);
    
    if(result.exercises.includes(exercise)){
        console.log('Exercise is already added to the Patient')
    } else {
        result.exercises.push(exercise)
    }
    
    res.json(result)
    result.save();
})

// Delete patient by id
router.delete('/delete/:id', async (req, res) => {
    const result = await Patient.findByIdAndDelete(req.params.id);

    res.json(result);
})

// get all exercises of the patient
router.get('/:id/exercises', async (req, res) => {
    try {
      const exercises = await Patient.findById(req.params.id).populate('exercises');
  
      if(exercises)  res.status(200).json(exercises.exercises);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

module.exports = router;