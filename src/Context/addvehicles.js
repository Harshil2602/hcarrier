// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Vehicles from "@/Models/Vehicles";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let v = new Vehicles({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        desc2: req.body[i].desc2,
        img: req.body[i].img,
        img2: req.body[i].img2,
        capacity: req.body[i].capacity,
        review: req.body[i].review,
        details: req.body[i].details,
        price: req.body[i].price,
        size: req.body[i].size,
      });
      await v.save();
    }
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
