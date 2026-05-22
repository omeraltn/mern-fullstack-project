const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const database = async () => {
  await mongoose
    .connect(process.env.MONGO_URI) // İçindeki {} parantezlerini ve ayarları sildik
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
    });
};

module.exports = database;
