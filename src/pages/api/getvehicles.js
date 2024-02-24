// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Vehicles from "@/Models/Vehicles";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  let vehicles = await Vehicles.find();
  res.status(200).json({ vehicles });
};
export default connectDb(handler);
