const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: String,
  image: String,
  role: {
    type: String,
    enum: ["buyer", "admin"],
    default: "buyer",
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
