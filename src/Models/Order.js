const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderVehicle: { type: Object, required: true },
    // vehicleOwner: [
    //   {
    //     name: { type: String, required: true },
    //     vehicleOwnerId: { type: String, required: true },
    //     vehicleName: { type: String, required: true },
    //   },
    // ],
    city: { type: String, required: true },
    pAddress: { type: String, required: true },
    dAddress: { type: String, required: true },
    distance: { type: Number, required: true },
    moNumber: { type: Number, required: true },
    payment: { type: Number, required: true },
    shiftingDate: { type: String, required: true },
    requirement: { type: String, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);

const modelName = "Order";
let Order;

try {
  // Check if the model is already defined
  Order = mongoose.model(modelName);
} catch (error) {
  // Define the model if it doesn't exist
  Order = mongoose.model(modelName, OrderSchema);
}

module.exports = Order;
