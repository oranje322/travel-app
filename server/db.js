const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    console.log('Mongo DB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;