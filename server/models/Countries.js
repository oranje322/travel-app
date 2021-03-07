const mongoose = require("mongoose");

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
  attractions: [],
});

module.exports = Countries = mongoose.model("countries", CountriesSchema);
