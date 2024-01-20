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
        return date < Date.now();
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

function validateStudent(user) {
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

  return schema.validate(user);
}

module.exports = { Student, validate: validateStudent };
