import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, Fragment, useEffect, useRef } from "react";
import Vehicles from "@/Models/Vehicles";
import mongoose from "mongoose";
import Autocomplete from "@mui/material/Autocomplete";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { RxDotFilled } from "react-icons/rx";
import { FaRegCreditCard, FaRegEdit, FaWarehouse } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";
import { VscPackage } from "react-icons/vsc";
import { useMyContext } from "@/Context/userInfo/UserInfoContext";
import MapSearchBox from "../Components/MapSearchBox";

const cityArr = ["Surat", "Ahemdabad"];
const reqArr = ["Shifting", "Cureir"];

export default function Getestimate({ vehicles }) {
  const router = useRouter();
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaHJwaXBhbGl5YSIsImEiOiJjbGxhcHc4bGgxdDA1M2Rta2trMWpzOGIwIn0.f7dxbVAqITPMkxSho7mNLQ";

  const {
    email,
    setEmail,
    city,
    setCity,
    pAddress,
    setpAddress,
    dAddress,
    setdAddress,
    moNumber,
    setmoNumber,
    requirement,
    setRequierment,
    distance,
    setDistance,
    payment,
    setPayment,
    shiftingDate,
    setShiftingDate,
    pcoordinates,
    setpCoordinates,
    dcoordinates,
    setdCoordinates,
  } = useMyContext();

  const [orderVehicle, setorderVehicle] = useState({});
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");
  const [requirementError, setRequirementError] = useState("");
  const [moNumberError, setmoNumberError] = useState("");
  const [shiftingDateError, setShiftingDateError] = useState("");

  const imageStyle = {
    height: "auto",
  };

  const pAddressHandler = ({ label, coordinates }) => {
    setpAddress(label);
    setpCoordinates(coordinates);
  };
  const dAddressHandler = ({ label, coordinates }) => {
    setdAddress(label);
    setdCoordinates(coordinates);
  };
  const calculateDistance = () => {
    if (pcoordinates.length !== 2 || dcoordinates.length !== 2) {
      return alert(
        "Please enter valid coordinates for both Picukup Address and Drop Address."
      );
    }

    const startPoint = turf.point(pcoordinates);
    const endPoint = turf.point(dcoordinates);
    const options = { units: "kilometers" };
    const distanceInKilometers = turf.distance(startPoint, endPoint, options);

    setDistance(distanceInKilometers.toFixed(2));
  };

  const handleItemClick = async (index) => {
    setActiveIndex(index);
    setOpen(true);
    let currentV = await vehicles[index];
    setorderVehicle(currentV);
  };

  const handleFormClick = () => {
    setOpen1(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!moNumber.trim()) {
      setmoNumberError("Phone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(moNumber)) {
      setmoNumberError("Invalid phone number");
      isValid = false;
    } else {
      setmoNumberError("");
    }

    if (!requirement || !city) {
      setRequirementError("required");
      isValid = false;
    } else {
      setRequirementError("");
    }

    if (!shiftingDate) {
      setShiftingDateError("Shifting date is required");
      isValid = false;
    } else {
      const today = new Date();
      const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
      const maxDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days from now

      const selectedDate = new Date(shiftingDate);

      if (selectedDate < minDate || selectedDate > maxDate) {
        setShiftingDateError(
          "Shifting date must be between tomorrow and 15 days from now"
        );
        isValid = false;
      } else {
        setShiftingDateError("");
      }
    }

    if (pcoordinates.length !== 2 || dcoordinates.length !== 2) {
      isValid = false;
    }
    if (isValid) {
      setOpen1(false);
      setShiftingDateError(""), setmoNumberError(""), setEmailError("");
    }

    if (localStorage.getItem("token")) {
      const res = await fetch(`http://localhost:3000/api/preorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });
      const response = await res.json();
      if (response.success) {
        toast.success("Your pre Order is Created!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setEmail(""),
            setCity(""),
            setpAddress(""),
            setdAddress(""),
            setmoNumber(""),
            setRequierment("");
          setPayment(0);
          setDistance(0);
          setShiftingDate("");
          router.push("/PnM");
        }, 1000);
      } else {
        toast.error("Invalide Credential!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      {
        toast.error("Please login first!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!moNumber.trim()) {
      setmoNumberError("Phone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(moNumber)) {
      setmoNumberError("Invalid phone number");
      isValid = false;
    } else {
      setmoNumberError("");
    }

    if (!requirement || !city) {
      setRequirementError("required");
      isValid = false;
    } else {
      setRequirementError("");
    }

    if (!shiftingDate) {
      setShiftingDateError("Shifting date is required");
      isValid = false;
    } else {
      const today = new Date();
      const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
      const maxDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days from now

      const selectedDate = new Date(shiftingDate);

      if (selectedDate < minDate || selectedDate > maxDate) {
        setShiftingDateError(
          "Shifting date must be between tomorrow and 15 days from now"
        );
        isValid = false;
      } else {
        setShiftingDateError("");
      }
    }
    if (pcoordinates.length !== 2 || dcoordinates.length !== 2) {
      isValid = false;
    }

    calculateDistance();
    if (isValid) {
      setOpen1(false);
      setShiftingDateError(""), setmoNumberError(""), setEmailError("");
    }

    return isValid;
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Edit Information Section */}
      <section className="mt-5 bg-white rounded-lg shadow-md p-4">
        <div className="sm:flex  md:grid grid-cols-3 w-auto   ">
          <div className="mb-5 sm:flex-col ml-20 font-semibold  md:col-start-1 ">
            <RxDotFilled className="inline text-3xl  text-green-600" />
            Pickup Address :
            <div className="ml-3 justify-center font-medium ">{pAddress}</div>
          </div>
          <div className=" sm:flex-col font-semibold  md:col-start-2 md:mx-auto  ">
            Total Distance :
            <div className="ml-3 text-center justify-center font-medium">
              {distance}
            </div>
          </div>
          <div className=" sm:flex-col font-semibold   md:col-start-3 ml-auto mr-20 ">
            <RxDotFilled className="inline text-3xl text-red-600" />
            Drop Address :
            <div className="ml-3 justify-center font-medium">{dAddress}</div>
          </div>
          <div className=" sm:flex-col font-semibold  md:col-start-2 mx-auto ">
            Shifting Date :
            <div className="ml-3 justify-center font-medium">
              {shiftingDate}
            </div>
          </div>
          <FaRegEdit
            onClick={handleFormClick}
            className="col-start-3 text-xl ml-auto mr-20"
          />
          <Transition.Root show={open1} as={Fragment}>
            <Dialog as="div" className="relative z-30  m-0 " onClose={setOpen1}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 hidden  bg-gray-500 bg-opacity-75 transition-opacity md:block" />
              </Transition.Child>

              <div className="fixed inset-0 z-10  overflow-y-auto">
                <div className="flex  h-3/4  min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  >
                    <Dialog.Panel className=" w-full  transform text-left text-base transition md:my-4 md:max-w-2xl md:px-4 lg:max-w-4xl">
                      <div className="relative  w-full  items-center overflow-hidden bg-white m-0 px-2 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-8 ">
                        <button
                          type="button"
                          className="absolute right-4 top-4 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                          onClick={() => setOpen1(false)}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <form
                          onSubmit={validateForm}
                          className="container w-full px-10   flex"
                        >
                          <div className="w-full bg-white rounded-lg p-8 flex flex-col md:ml-auto  mt-5 md:mt-0 relative z-10 shadow-md">
                            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">
                              Edit Your Information
                            </h2>
                            <div className="relative mb-1">
                              <label
                                htmlFor="name"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {emailError && (
                                <p className="text-red-500">{emailError}</p>
                              )}
                            </div>
                            <div className="relative mb-4">
                              <label
                                htmlFor="moNumber"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Phone No.
                              </label>
                              <input
                                type="phone"
                                id="moNumber"
                                name="moNumber"
                                value={moNumber}
                                onChange={(e) => {
                                  setmoNumber(e.target.value);
                                }}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {moNumberError && (
                                <p className="text-red-500">{moNumberError}</p>
                              )}
                            </div>
                            <div className="relative mb-4">
                              <MapSearchBox
                                label="Pickup Address"
                                onData={pAddressHandler}
                              />
                            </div>
                            <div className="relative mb-4">
                              <MapSearchBox
                                label="Drop Address"
                                onData={dAddressHandler}
                              />
                            </div>
                            <div className="relative flex mb-1 ">
                              <Autocomplete
                                className="w-1/2 mr-2"
                                value={city}
                                onChange={(event, newValue) => {
                                  setCity(newValue);
                                }}
                                id="controllable-states-demo"
                                options={cityArr}
                                required={true}
                                renderInput={(params) => (
                                  <TextField {...params} label="City" />
                                )}
                              />
                              <Autocomplete
                                className="w-1/2"
                                value={requirement}
                                onChange={(event, newValue) => {
                                  setRequierment(newValue);
                                }}
                                id="controllable-states-demo"
                                options={reqArr}
                                required={true}
                                renderInput={(params) => (
                                  <TextField {...params} label="Requirement" />
                                )}
                              />
                            </div>
                            {cityError ||
                              (requirementError && (
                                <p className="text-red-500">
                                  {(cityError, requirementError)}
                                </p>
                              ))}
                            <div className="relative mb-4">
                              <label
                                htmlFor="shiftingDate"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Shifting Date
                              </label>
                              <input
                                type="date"
                                id="shiftingDate"
                                name="shiftingDate"
                                value={shiftingDate}
                                onChange={(e) => {
                                  setShiftingDate(e.target.value);
                                }}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {shiftingDateError && (
                                <p className="text-red-500">
                                  {shiftingDateError}
                                </p>
                              )}
                            </div>

                            <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                              Proceed
                            </button>
                          </div>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>{" "}
        </div>
      </section>
      <section>
        {/* Display All Vehicles */}
        <section className="text-gray-600 body-font">
          <div className="text-center font-semibold m-5">
            First click edit button and ADD aditional information
          </div>
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-wrap m-4">
              {vehicles.map((item, index) => {
                return (
                  <div key={vehicles[index]._id} className="flex p-4 md:w-1/3">
                    <div
                      onClick={() => handleItemClick(index)}
                      className="flex-1 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden aspect-w-2 aspect-h-1"
                    >
                      <div className="flex items-center justify-center">
                        <Image
                          width={200}
                          height={200}
                          className="m-6 object-cover"
                          src={item.img}
                          alt="blog"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          {item.title}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          INR{" "}
                          {distance == ""
                            ? item.price
                            : parseInt((item.price * distance) / 7)}
                        </h1>
                        <p className="leading-relaxed mb-3">
                          Capacity: {item.capacity}
                        </p>
                        <p className="leading-relaxed mb-3">
                          Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>
      {/* Genrate Pre Oreder */}
      <section>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-30  m-0 " onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 hidden  bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            <div className="fixed inset-0 z-10  overflow-y-auto">
              <div className="flex  h-3/4  min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel className=" w-full  transform text-left text-base transition md:my-4 md:max-w-2xl md:px-4 lg:max-w-4xl">
                    <div className="relative  w-full  items-center overflow-hidden bg-white m-0 px-2 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-8 ">
                      <button
                        type="button"
                        className="absolute right-4 top-4 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-4 lg:top-4"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
                      </button>
                      <div className="flex flex-col w-full sm:flex-row items-center">
                        <div className="w-full md:w-1/3 m-3 mr-2 items-center ">
                          <div className=" w-full  items-start  ">
                            <div className="flex items-center justify-center h-auto">
                              <Image
                                width={200}
                                height={200}
                                className="m-2 object-cover "
                                src={vehicles[activeIndex].img}
                                alt="vehilces"
                                priority
                              />
                            </div>

                            <div className="text-center justify-center mt-4 ">
                              <div className="bg-cyan-100 inline p-1 rounded-lg mb-4">
                                <FaWarehouse className=" inline mb-1 mx-2" />
                                <div className="inline ">
                                  {vehicles[activeIndex].capacity}
                                </div>
                              </div>
                              <h2 className="text-xl font-bold text-gray-900 mt-1">
                                {vehicles[activeIndex].title}
                              </h2>
                              <div className="mb-6">
                                Stating at
                                <span className="font-bold mx-1">
                                  ₹{vehicles[activeIndex].price}
                                </span>
                              </div>
                              <hr />
                              <div className="m-2 mt-5 text-center md:text-left">
                                <h3 className="mb-2 font-semibold">
                                  Best for Sending:
                                </h3>
                                <div className="mb-2 ">
                                  <GiFruitBowl className="inline mb-1 mr-2" />
                                  Fruits and Vegetables
                                </div>
                                <div className="mb-2">
                                  <SlChemistry className="inline mb-1 mr-2" />
                                  Chemicals
                                </div>
                                <div className="mb-2">
                                  <VscPackage className="inline mb-1 mr-2" />
                                  FMGC Food Products
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <form
                          className="w-full mt-3 md:w-4/6 items-center justify-center"
                          onSubmit={handleSubmit}
                          method="POST"
                        >
                          <div className="w-full bg-white rounded-lg p-3 flex flex-col md:ml-auto   md:mt-0 relative z-10 shadow-md">
                            <h2 className="text-gray-900 text-xl mb-3 text-center font-medium title-font">
                              Book Pre Order
                            </h2>
                            <div className="relative mb-4">
                              <MapSearchBox
                                label="Pickup Address"
                                onData={pAddressHandler}
                              />
                            </div>
                            <div className="relative mb-4">
                              <MapSearchBox
                                label="Drop Address"
                                onData={dAddressHandler}
                              />
                            </div>
                            <div className="relative mb-1">
                              <label
                                htmlFor="email"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {!email && emailError && (
                                <p className="text-red-500">{emailError}</p>
                              )}
                            </div>
                            <div className="relative mb-4">
                              <label
                                htmlFor="moNumber"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Phone No.
                              </label>
                              <input
                                type="moNumber"
                                id="moNumber"
                                name="moNumber"
                                value={moNumber}
                                onChange={(e) => {
                                  setmoNumber(e.target.value);
                                }}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {moNumberError && (
                                <p className="text-red-500">{moNumberError}</p>
                              )}
                            </div>

                            <div className="relative flex mb-1 ">
                              <Autocomplete
                                className="w-1/2 mr-2"
                                value={city}
                                onChange={(event, newValue) => {
                                  setCity(newValue);
                                }}
                                id="controllable-states-demo"
                                options={cityArr}
                                required={true}
                                renderInput={(params) => (
                                  <TextField {...params} label="City" />
                                )}
                              />
                              <Autocomplete
                                className="w-1/2"
                                value={requirement}
                                onChange={(event, newValue) => {
                                  setRequierment(newValue);
                                }}
                                id="controllable-states-demo"
                                options={reqArr}
                                required={true}
                                renderInput={(params) => (
                                  <TextField {...params} label="Requirement" />
                                )}
                              />
                            </div>
                            {cityError ||
                              (requirementError && (
                                <p className="text-red-500">
                                  {(cityError, requirementError)}
                                </p>
                              ))}
                            <div className="relative mb-4">
                              <label
                                htmlFor="shiftingDate"
                                className="leading-7 text-sm text-gray-600"
                              >
                                Shifting Date
                              </label>
                              <input
                                type="date"
                                id="shiftingDate"
                                name="shiftingDate"
                                value={shiftingDate}
                                onChange={(e) => {
                                  setShiftingDate(e.target.value);
                                }}
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {shiftingDateError && (
                                <p className="text-red-500">
                                  {shiftingDateError}
                                </p>
                              )}
                            </div>

                            <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                              Book Order
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>{" "}
      </section>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let vehicles = await Vehicles.find();

  return { props: { vehicles: JSON.parse(JSON.stringify(vehicles)) } };
}
