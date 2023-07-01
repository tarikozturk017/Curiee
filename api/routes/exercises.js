const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// get all exercises
router.get('/all', async (req, res) => {
    const exercises = await Exercise.find().populate('creator');
    res.json(exercises);
})

// exercise by id
router.get('/:id', async (req, res) => {
    try {
      const exercise = await Exercise.findById(req.params.id).populate('creator');
      
      if(exercise)  res.status(200).json(exercise);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  // create a new exercise
router.post('/new', (req, res) => {
    console.log(req.body);
    const exercise = new Exercise({
        title: req.body.title,
        description: req.body.description,
        diseaseTreatment: req.body.diseaseTreatment,
        creator: req.body.therapistId
    })

    exercise.save()
    res.json(exercise)
})

// delete exercise
router.delete('/:id', async (req, res) => {
    const result = await Exercise.findByIdAndDelete(req.params.id);

    res.json(result)
})

module.exports = router;