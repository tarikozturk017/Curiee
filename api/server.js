const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors()); // avoid cross origin errors

const uri = 'mongodb+srv://tarikozturkk1:Takomac.1995@hc-managemenet-system.fzpqavf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("Connected to DB")
    ).catch(console.error)

// import Patient model
const Model = require('./models/Patient');
const Patient = Model.Patient
const Exercise = Model.Exercise

// get all the patients
app.get('/patients', async (req, res) => {
    const patients = await Patient.find();

    res.json(patients);
})

// Create new patient
app.post('/patient/new', (req, res) => {
    console.log(req.body)
    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        diagnosis: req.body.diagnosis
    })

    patient.save();
    res.json(patient)
})

// update patient
app.put('/patient/edit/:id', async (req, res) => {
    const result = await Patient.findById(req.params.id); // get the patient

    result.exercises.push(req.body.exerciseId);
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

// create a new exercise
app.post('/exercise/new', (req, res) => {
    console.log(req.body);
    const exercise = new Exercise({
        title: req.body.title,
        description: req.body.description,
    })

    exercise.save()
    res.json(exercise)
})

app.listen(3001, () => console.log("Server started on port 3001"))