const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  token: { type: String }
});

const User = mongoose.model("user" , userSchema);

const validateRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().required().label("FirstName"),
    lastName: Joi.string().alphanum().required().label("LastName"),
    email: Joi.string().required().email({ tlds: { allow: false } }).label("Email"),
    password: passwordComplexity().min(8).max(20).required().label("Password"),
  });
  return schema.validate(data);
}

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: passwordComplexity()
      .min(8)
      .max(20)
      .required()
      .label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validateRegister, validateLogin };