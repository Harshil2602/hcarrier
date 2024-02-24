// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "@/Models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { email, name, role } = req.body;
    let u = new User({
      email,
      name,
      role,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SecretKey
      ).toString(),
    });
    await u.save();
    res.status(200).json({ success: "sucsses" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
