const { Schema, model } = require("mongoose");

const User = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    age: { type: Number },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", User);
