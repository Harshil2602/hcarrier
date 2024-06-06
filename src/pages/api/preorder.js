// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "@/Models/Order";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const {
      email,
      pAddress,
      dAddress,
      distance,
      shiftingDate,
      payment,
      moNumber,
      city,
      requirement,
      orderVehicle,
      status,
    } = req.body;
    try {
      let order = new Order({
        email,
        pAddress,
        dAddress,
        distance,
        shiftingDate,
        payment,
        moNumber,
        city,
        requirement,
        orderVehicle,
        status,
      });

      await order.save();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error creating order" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};
export default connectDb(handler);
