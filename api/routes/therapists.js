const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const Patient = require('../models/Patient');

// get all therapists
router.get('/all', async (req, res) => {
    const therapists = await Therapist.find();
    res.json(therapists);
})

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