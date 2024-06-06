const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const modelName = "User";
let User;

try {
  // Check if the model is already defined
  User = mongoose.model(modelName);
} catch (error) {
  // Define the model if it doesn't exist
  User = mongoose.model(modelName, UserSchema);
}

module.exports = User;
