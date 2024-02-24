import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import mongoose from "mongoose";
import Order from "../../Models/Order";
import { BsArrowRight } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";
import { VscPackage } from "react-icons/vsc";
import { distance } from "@turf/turf";

export default function id({ orders }) {
  return (
    <>
      <div className="bg-slate-100 container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* Order details */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-center">
              Order Details
            </h1>
            {/* Add order details here */}
            <div className="flex md:flex-row flex-col">
              <h2 className="text-xl font-medium">Order #{orders._id} </h2>
              <p className="mt-1 mx-3 text-blue-600">
                {" "}
                view invoice <BsArrowRight className="inline" />
              </p>
              <div className="ml-auto">
                Order Placed On{" "}
                <p className="inline font-medium">{orders.createdAt}</p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:grid grid-cols-5 gap-2 mb-5 border rounded-md  ">
            <div className="flex lg:flex-row flex-col items-center justify-center col-start-1 col-end-3">
              <div className="r">
                <Image
                  width={200}
                  height={200}
                  className="m-2 object-cover bg-slate-50"
                  src={orders.orderVehicle.img}
                  alt="blog"
                />
              </div>
              <div className=" my-auto ">
                <div className="bg-cyan-100 inline p-1 rounded-lg mb-2">
                  <FaWarehouse className=" inline mb-1 mx-2" />
                  <div className="inline ">{orders.orderVehicle.capacity}</div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-1">
                  {orders.orderVehicle.title}
                </h2>
                <div className="mb-3">
                  Stating at
                  <span className="font-bold mx-1">
                    ₹{orders.orderVehicle.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-start-3 col-end-6 text-justify m-2 my-auto">
              {orders.orderVehicle.desc2}
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-3">
            <div className="col-start-1 my-5 text-center font-medium text-lg">
              Picuk Up Address
              <p className="font-normal text-base">{orders.pAddress}</p>
            </div>
            <div className="col-start-2  my-5 text-center font-medium text-lg">
              Total Distance{" "}
              <p className="font-normal text-base">{orders.distance}</p>
            </div>
            <div className="col-start-3  my-5 text-center font-medium text-lg">
              Drop Up Address{" "}
              <p className="font-normal text-base">{orders.dAddress}</p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-3">
            <div className="col-start-1 my-5 text-center font-medium text-lg">
              Total Payment
              <p className="font-normal text-base">
                {parseInt((orders.orderVehicle.price * orders.distance) / 7)}
              </p>
            </div>
            <div className="col-start-2 my-5 text-center font-medium text-lg">
              Payment Method{" "}
              <p className="font-normal text-base">Cash / UPI </p>
            </div>
            <div className="col-start-3 my-5 text-center font-medium text-lg">
              Shipping For{" "}
              <p className="font-normal text-base">{orders.requirement} </p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-2">
            <div className="col-start-1 my-5 text-center font-medium text-lg">
              Shipped On{" "}
              <p className="font-normal text-base">{orders.shiftingDate}</p>
            </div>
            <div className="col-start-2 my-5 text-center font-medium text-lg">
              Shipping Updates{" "}
              <p className="font-normal text-base">{orders.status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.findById({ _id: context.query.id });

  return { props: { orders: JSON.parse(JSON.stringify(orders)) } };
}
