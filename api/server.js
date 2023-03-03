require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json());
app.use(cors()); // avoid cross origin errors

// replace -> API_URI
const uri = process.env.API_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("Connected to DB")
    ).catch(console.error)

// import models
const Patient = require('./models/Patient');
const Exercise = require('./models/Exercise');
const Therapist = require('./models/Therapist');

// app.use('/api/auth', authRoutes);
    

// check the password when a patient signs in
app.post('/patient/login', async (req, res) => {
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

// get all the patients
app.get('/patients', async (req, res) => {
    const patients = await Patient.find();

    res.json(patients);
})

// get patient by id
app.get('/patient/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id); // get the patient
    
        if(patient)  res.status(200).json(patient);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
      }
})

// get patient by email
// app.get('/patient/:email', async (req, res) => {

//     console.log(`email: ${req.params.email}`)
//     try {
//         const patient = await Patient.findOne({email: req.params.email}); // get the patient
    
//         if(patient)  res.status(200).json(patient);
//       } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'An error occurred' });
//       }
// })
app.get('/patient', async (req, res) => {
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
  

// Create new patient
app.post('/patient/new', (req, res) => {
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
app.put('/patient/edit/:id', async (req, res) => {
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
app.delete('/patient/delete/:id', async (req, res) => {
    const result = await Patient.findByIdAndDelete(req.params.id);

    res.json(result);
})

// get all exercises
app.get('/exercises', async (req, res) => {
    const exercises = await Exercise.find();
    res.json(exercises);
})

// exercise by id
app.get('/exercise/:id', async (req, res) => {
    try {
      const exercise = await Exercise.findById(req.params.id);
  
      if(exercise)  res.status(200).json(exercise);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

// get all exercises of the patient
app.get('/patient/:id/exercises', async (req, res) => {
    try {
      const exercises = await Patient.findById(req.params.id).populate('exercises');
  
      if(exercises)  res.status(200).json(exercises.exercises);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

// create a new exercise
app.post('/exercise/new', (req, res) => {
    console.log(req.body);
    const exercise = new Exercise({
        title: req.body.title,
        description: req.body.description,
        diseaseTreatment: req.body.diseaseTreatment
    })

    exercise.save()
    res.json(exercise)
})

// delete exercise
app.delete('/exercise/:id', async (req, res) => {
    const result = await Exercise.findByIdAndDelete(req.params.id);

    res.json(result)
})

// get all therapists
app.get('/therapists', async (req, res) => {
    const therapists = await Therapist.find();
    res.json(therapists);
})

// create therapist
app.post('/therapist/new', (req, res) => {
    const therapist = new Therapist({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation
    })

    therapist.save();
    res.json(therapist)
})

// update therapist
app.put('/therapist/edit/:id', async (req, res) => {
    const result = await Therapist.findById(req.params.id); // get the patient

    const patient = await Patient.findById(req.body.patientId);
    
    if(result.patients.includes(patient)){
        console.log('Patient is already added to the Therapist')
    } else {
        result.patients.push(patient)
    }
    
    res.json(result)
    result.save();
})


app.listen(3001, () => console.log("Server started on port 3001"))