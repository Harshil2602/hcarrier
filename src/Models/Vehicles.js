const mongoose = require("mongoose");

const VehiclesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    desc2: { type: String, required: true },
    img: { type: String, required: true },
    img2: { type: String, required: true },
    capacity: { type: String, required: true },
    review: { type: String },
    details: { type: String },
    price: { type: Number, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true }
);

const modelName = "Vehicles";
let Vehicles;

try {
  // Check if the model is already defined
  Vehicles = mongoose.model(modelName);
} catch (error) {
  // Define the model if it doesn't exist
  Vehicles = mongoose.model(modelName, VehiclesSchema);
}

module.exports = Vehicles;
