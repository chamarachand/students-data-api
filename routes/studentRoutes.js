const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const contactSchema = new mongoose.Schema({
  phone: { type: String, minlength: 10, maxlength: 15, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, unique: true, required: true },
  firstName: { type: String, minlength: 1, maxlength: 50 },
  lastName: { type: String, minlength: 1, maxlength: 50 },
  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function (date) {
        date < Date.now();
      },
      message: "Birthdate cannot be today or in future!",
    },
    required: true,
  },
  address: { type: String, minlength: 5, maxlength: 255, required: true },
  contact: contactSchema,
  guardianInfo: {
    name: { type: String, minlength: 3, maxlength: 75, required: true },
    contact: contactSchema,
  },
  isActive: { type: Boolean, default: true },
  semFeesPaid: { type: Boolean, default: false },
  hasLibraryAccess: { type: Boolean, default: false },
  doingSports: { type: Boolean, default: false },
  inClubs: { type: Boolean, default: false },
});

const Student = mongoose.model("Student", studentSchema);

//Get
router.get("/", (req, res) => {
  res.send("Welcome to student database");
});

router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

router.get("/students/:studentId", async (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const student = await Student.findOne({ studentId: studentId });

  if (!student)
    return res.status(404).send("Student with the given ID not found");
  res.send(student);
});

//POST
router.post("/students", async (req, res) => {
  const contactSchema = Joi.object({
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().min(5).max(255).required(),
  });

  const schema = Joi.object({
    studentId: Joi.number().integer().positive().required(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    gender: Joi.string()
      .valid("male", "female")
      .message("Gender must be either male or female")
      .required(),
    dateOfBirth: Joi.date()
      .max("now")
      .message("Date of birth cannot be tody or in the future")
      .required(),
    contact: contactSchema,
    guardianInfo: Joi.object({
      name: Joi.string().min(3).max(75).required(),
      contact: contactSchema,
    }),
    isActive: Joi.boolean(),
    semFeesPaid: Joi.boolean(),
    hasLibraryAccess: Joi.boolean(),
    doingSports: Joi.boolean(),
    inSports: Joi.boolean(),
  });

  const student = req.body;
  const { error } = schema.validate(student);

  if (error) return res.status(400).send(error.details[0].message);
  try {
    const newStudent = await Student.create(student);
    res.status(201).send(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
