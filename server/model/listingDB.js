const mongoose = require("mongoose");
const Joi = require("joi");

const listingSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
  location: { type: String, require: true },
  price: { type: Number, require: true },
  rules: { type: String, require: true },
  startDate: { type: String, require: true },
  endDate: { type: String, require: true },
  noOfPeople: { type: Number, require: true },
  ammenities: { type: String, require: true },
});

const Listing = mongoose.model("listing", listingSchema);

const validateListing = (data) => {
  const schema = Joi.object({
    title: Joi.string().alphanum().required().label("Title"),
    description: Joi.string().required().label("Description"),
    image: Joi.string().required().label("Image"),
    location: Joi.string().required().label("Location"),
    price: Joi.number().required().label("Price"),
    rules: Joi.string().required().label("Rules"),
    startDate: Joi.string().required().label("startDate"),
    endDate: Joi.string().required().label("endDate"),
    noOfPeople: Joi.number().required().label("noOfPeople"),
    ammenities: Joi.string().required().label("Ammenities")
  });
  return schema.validate(data);
};

module.exports = { Listing, validateListing };
