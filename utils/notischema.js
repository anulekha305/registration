const Joi = require("joi");


const notiSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    content: Joi.string().trim().min(10).max(1000).required()
});

module.exports = notiSchema;


