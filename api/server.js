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

const Patient = require('./models/Patient');

app.get('/patients', async (req, res) => {
    const patients = await Patient.find();

    res.json(patients);
})

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


app.delete('/patient/delete/:id', async (req, res) => {
    const result = await Patient.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.listen(3001, () => console.log("Server started on port 3001"))