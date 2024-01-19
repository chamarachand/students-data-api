const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, unique: true, required: true },
  firstName: { type: String, minlength: 1, maxlength: 50 },
  lastName: { type: String, minlength: 1, maxlength: 50 },
  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: { type: Date, required: true },
  contact: {
    phone: { type: String, minlength: 10, maxlength: 15, required: true },
    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    address: { type: String, minlength: 5, maxlength: 255 },
  },
  guardianInfo: {
    name: { type: String, minlength: 1, maxlength: 75 },
    contact: {
      phone: { type: String, minlength: 10, maxlength: 15, required: true },
      email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255,
      },
    },
  },
  isActive: { type: Boolean, default: true },
  semFeesPaid: { type: Boolean, default: false },
  hasLibraryAccess: { type: Boolean, default: false },
  doingSports: { type: Boolean, default: false },
  inClubs: { type: Boolean, default: false },
});

//Get
router.get("/", (req, res) => {
  res.send("Welcome to student database");
});

router.get("/students", (req, res) => {});

module.exports = router;
