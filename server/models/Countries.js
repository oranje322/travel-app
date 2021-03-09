const mongoose = require("mongoose");

const AttractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    required: true,
    unique: true,
  },
});

const CountriesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    unique: true,
  },
  capital: {
    type: String,
    required: true,
    unique: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  currency: {
    type: String,
    required: true,
    unique: true,
  },
  ISOCode: {
    type: String,
    required: true,
    unique: true,
  },
  currency: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    required: true,
    unique: true,
  },
  videoURL: {
    type: String,
    required: true,
    unique: true,
  },
  attractions: [AttractionSchema],
});

module.exports = Countries = mongoose.model("countries", CountriesSchema);
