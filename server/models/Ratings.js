const mongoose = require("mongoose");

const RatingsSchema = new mongoose.Schema({
	attraction: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = Ratings = mongoose.model("ratings", RatingsSchema);