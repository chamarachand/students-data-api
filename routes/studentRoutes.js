const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

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
  address: { type: String, minlength: 5, maxlength: 255 },
  contact: contactSchema,
  guardianInfo: contactSchema,
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

module.exports = router;
