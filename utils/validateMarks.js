const Joi = require("joi");

const marksSchema = Joi.object({
  student: Joi.string().trim().min(1).required(),
  subject: Joi.string().trim().min(1).required(),
  semester: Joi.number().integer().min(1).max(12).required(),
  rollno: Joi.number().integer().min(1).required(),
  marks: Joi.number().min(0).max(100).required()
});

module.exports.marksSchema = marksSchema;




