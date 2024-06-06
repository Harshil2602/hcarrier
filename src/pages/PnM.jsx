import Image from "next/image";
import { useState } from "react";
import Router from "next/router";
import { MdOutlineHomeWork } from "react-icons/md";
import { BsCheckCircle, BsTruck } from "react-icons/bs";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import TextField from "@mui/material/TextField";
import profilePic from "../../public/P&Mimage1.jpg";
import Autocomplete from "@mui/material/Autocomplete";
import MapSearchBox from "@/Components/MapSearchBox";
import { useMyContext } from "@/Context/userInfo/UserInfoContext";

const priceArr = [
  { ShiftingType: "Upto 2 items", StartingFrom: "Rs 1500" },
  { ShiftingType: "1RK/Studio	", StartingFrom: "Rs 3500" },
  { ShiftingType: "1BHK", StartingFrom: "Rs 4700" },
  { ShiftingType: "2BHK", StartingFrom: "Rs 7800" },
  { ShiftingType: "3BHK", StartingFrom: "Rs 10800" },
  { ShiftingType: "4BHK+", StartingFrom: "Rs 14500" },
];
const cityArr = ["Surat", "Ahemdabad"];
const reqArr = ["Shifting", "Cureir"];

export default function PnM() {
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
    shiftingDate,
    setShiftingDate,
    distance,
    setDistance,
    pcoordinates,
    setpCoordinates,
    dcoordinates,
    setdCoordinates,
  } = useMyContext();

  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");
  const [requirementError, setRequirementError] = useState("");
  const [moNumberError, setmoNumberError] = useState(null);
  const [shiftingDateError, setShiftingDateError] = useState("");

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
      ("Please enter valid coordinates for both Picukup Address and Drop Address.");
      return;
    }

    const startPoint = turf.point(pcoordinates);
    const endPoint = turf.point(dcoordinates);
    const options = { units: "kilometers" };
    const distanceInKilometers = turf.distance(startPoint, endPoint, options);

    const distanceInteger = parseInt(distanceInKilometers.toFixed(2));

    setDistance(distanceInteger);
  };
  const validateForm = () => {
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
      setShiftingDateError(""), setmoNumberError(""), setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      calculateDistance(),
        Router.push({
          pathname: "/Getestimate",
        });
    }
  };
  return (
    <>
      {/* PreOrder Form Is Hese */}
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <Image alt="map" className="h-full" src={profilePic}></Image>
        </div>
        <form className="container px-10 py-10 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-5 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">
              Instant Quote Calculator
            </h2>
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
                type="phone"
                id="moNumber"
                name="moNumber"
                value={moNumber}
                onChange={(e) => {
                  setmoNumber(e.target.value);
                }}
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {moNumberError && <p className="text-red-500">{moNumberError}</p>}
            </div>
            <div className="relative mb-4">
              <MapSearchBox label="Pickup Address" onData={pAddressHandler} />
            </div>
            <div className="relative mb-4">
              <MapSearchBox label="Drop Address" onData={dAddressHandler} />
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
                renderInput={(params) => <TextField {...params} label="City" />}
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
                <p className="text-red-500">{(cityError, requirementError)}</p>
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
                <p className="text-red-500">{shiftingDateError}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
            >
              Proceed
            </button>
          </div>
        </form>
      </section>
      {/* Reliable Section Is Here*/}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-blue-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                Book Reliable and Express house shifting services online
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="https://dummyimage.com/1203x503"
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                Economical prices
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Hassle-free house shifting services that fit your budget
              </p>
              <a className="text-blue-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="https://dummyimage.com/1204x504"
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                Damage-proof packaging
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Multi-layered packing to ensure safe movement of household goods
              </p>
              <a className="text-blue-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="https://dummyimage.com/1205x505"
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                On-time shifting
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Experience reliable house shifting services
              </p>
              <a className="text-blue-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Work Section Here  */}
      <section className="text-grey-500 body-font bg-slate-100">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-blue-600 tracking-widest font-medium title-font mb-1">
              WORK
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-blue-950">
              How it Works
            </h1>
          </div>
          <div className="flex flex-wrap m-4">
            <div className="p-4 md:w-1/3 hover:shadow-2xl  ">
              <div className="flex rounded-lg h-full p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 flex flex-col items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                    <MdOutlineHomeWork />
                  </div>
                  <h2 className="text-blue-950 text-lg title-font font-medium">
                    Submit details and book a slot
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base  ">
                    Book mini truck online. Whenever you need, wherever you
                    need.
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 hover:shadow-2xl  ">
              <div className="flex rounded-lg h-full  p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full font-extrabold bg-blue-500 text-white flex-shrink-0">
                    <BsCheckCircle />
                  </div>
                  <h2 className="text-blue-950 text-lg title-font font-medium">
                    Our executive will call you, confirm the item list and
                    provide the best quote
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Enjoy the most affordable rates in town with our transparent
                    pricing.
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 hover:shadow-2xl ">
              <div className="flex rounded-lg h-full  p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full font-extrabold bg-blue-500 text-white flex-shrink-0">
                    <BsTruck />
                  </div>
                  <h2 className="text-blue-950 text-lg title-font font-medium">
                    Enjoy express, safe & hassle free shifting
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Superior safety ensured with our team of verified & trained
                    partners.
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section Here */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto mb-2 leading-relaxed font-semibold text-base">
              Charges are inclusive of labour charge, transportation charge &
              packing charge.
            </p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Our packers and movers service starts at INR 1500, inclusive of
              transportation, packing, and labour charges. Prices may vary
              depending on your apartment size, distance of shifting, quantity
              of goods to be transported and locality you are residing in. Road
              tax,toll, parking etc. are not included in the fare.
            </p>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-center title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-center title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceArr.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-4 py-3 text-center">
                        {item.ShiftingType}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.StartingFrom}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
              Know More
            </button>
          </div>
        </div>
      </section>
      {/* Testimonial Section Here */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="sm:text-4xl text-3xl text-center font-medium title-font mb-16 text-gray-900">
            Our Happy Customers
          </h1>
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://dummyimage.com/302x302"
                />
                <p className="leading-relaxed">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  HOLDEN CAULFIELD
                </h2>
                <p className="text-gray-500">Senior Product Designer</p>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://dummyimage.com/300x300"
                />
                <p className="leading-relaxed">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  ALPER KAMU
                </h2>
                <p className="text-gray-500">UI Develeoper</p>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://dummyimage.com/305x305"
                />
                <p className="leading-relaxed">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  HENRY LETHAM
                </h2>
                <p className="text-gray-500">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
