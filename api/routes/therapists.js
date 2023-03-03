const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const Patient = require('../models/Patient');

// get all therapists
router.get('/all', async (req, res) => {
    const therapists = await Therapist.find();
    res.json(therapists);
})

// create therapist
router.post('/new', (req, res) => {
    const therapist = new Therapist({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation
    })

    therapist.save();
    res.json(therapist)
})

// update therapist
router.put('/edit/:id', async (req, res) => {
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

module.exports = router;