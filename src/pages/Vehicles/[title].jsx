import { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Vehicles from "@/Models/Vehicles";
import mongoose from "mongoose";

export default function Vehicals({ vehicles }) {
  const [activeButton, setActiveButton] = useState("description");

  const handleOnClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-11/12 mx-auto flex flex-wrap ">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-center text-gray-500 tracking-widest">
                {vehicles.title}
              </h2>
              <h1 className="text-gray-900 text-center text-3xl title-font font-medium mb-4">
                {vehicles.desc}
              </h1>
              <div className="flex mb-4">
                <button
                  onClick={() => handleOnClick("description")}
                  className={`flex-grow ${
                    activeButton === "description"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "border-gray-300"
                  } py-2 text-lg px-1`}
                >
                  Description
                </button>
                <button
                  onClick={() => handleOnClick("reviews")}
                  className={`flex-grow ${
                    activeButton === "reviews"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "border-gray-300"
                  } py-2 text-lg px-1`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => handleOnClick("details")}
                  className={`flex-grow ${
                    activeButton === "details"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "border-gray-300"
                  } py-2 text-lg px-1`}
                >
                  Details
                </button>
              </div>
              {activeButton === "description" && (
                <p className="leading-relaxed text-justify mb-4">
                  {vehicles.desc2}
                </p>
              )}

              {activeButton === "reviews" && (
                <p className="leading-relaxed text-justify  mb-4">
                  {vehicles.review}
                </p>
              )}

              {activeButton === "details" && (
                <p className="leading-relaxed text-justify mb-4">
                  {vehicles.details}
                </p>
              )}

              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Capacity</span>
                <span className="ml-auto text-gray-900">
                  {vehicles.capacity}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">{vehicles.size}</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Base Price</span>
                <span className="ml-auto text-gray-900">${vehicles.price}</span>
              </div>
              <div className="flex">
                {/* <span className="title-font font-medium text-2xl text-gray-900">
                  $58.00
                </span> */}
                <button
                  onClick={() => {
                    Router.push({
                      pathname: "/Getestimate",
                      query: {},
                    });
                  }}
                  className="flex mx-auto w-1/2  justify-center text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Get Estimate
                </button>
              </div>
            </div>
            <Image
              alt="ecommerce"
              className="lg:w-1/2  lg:h-auto h-64 object-cover object-center rounded items-center "
              width={400}
              height={400}
              src={vehicles.img}
            />
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let vehicles = await Vehicles.findOne({ title: context.query.title });

  return { props: { vehicles: JSON.parse(JSON.stringify(vehicles)) } };
}
