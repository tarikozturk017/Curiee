require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const authRoutes = require('./routes/auth');

const exercisesRouter = require("./routes/exercises");
const patientsRouter = require("./routes/patients");
const therapistsRouter = require("./routes/therapists");

const app = express();

app.use(express.json());
// app.use(
//   cors({
//     origin: ["https://curiee.vercel.app"], // to be changed to real one
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// ); // avoid cross origin errors
app.use(cors()); // avoid cross origin errors

const uri = process.env.API_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

// app.use('/api/auth', authRoutes);

app.get("/", function (req, res) {
  res.send("App is running");
});

app.use("/patient", patientsRouter);
app.use("/exercise", exercisesRouter);
app.use("/therapist", therapistsRouter);

app.listen(3001, () => console.log("Server started on port 3001"));
