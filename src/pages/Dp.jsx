import Image from "next/image";
import profilePic from "../../public/P&Mimage1.jpg";
import { MdOutlineHomeWork } from "react-icons/md";
import { BsCheckCircle, BsTruck } from "react-icons/bs";

function Dp() {
  return (
    <>
      {/* Heder Section Here */}
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <Image alt="map" className="h-full" src={profilePic}></Image>
        </div>
        <div className="container px-10 py-10 mx-auto flex">
          <div className="lg:w-1/4 md:w-1/3 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-5 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">
              Attach Vehicle Now
            </h2>
            <div className="relative mb-1">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Phone No.
              </label>
              <input
                type="name"
                id="number"
                name="number"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex w-full relative mb-4">
              <div className="w-1/2 mr-2 mb-4">
                <div>
                  <label
                    htmlFor="city"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                </div>
                <select className="w-full inline-block bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out">
                  <option value="1">Surat</option>
                  <option value="2">Ahemdabad</option>
                  <option value="3">Mumbai</option>
                  <option value="4">Delhi</option>
                  <option value="5">Benguluru</option>
                  <option value="6">Kolkata</option>
                  <option value="7">Indor</option>
                </select>
              </div>
              <div className="w-1/2 mb-4">
                <div>
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm  text-gray-600"
                  >
                    Vehicals
                  </label>
                </div>
                <select className="w-full bg-white inline-block rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out">
                  <option value="0" disabled>
                    Vehiclas
                  </option>
                  <option value="1">TATA ACE</option>
                  <option value="2">TATA 407</option>
                  <option value="3">3 WHEELER</option>
                  <option value="4">2 WHEELER</option>
                  <option value="5">PICKUP/8FT/DOST</option>
                  <option value="6">OTHERS</option>
                </select>
              </div>
            </div>

            <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
              REGISTER
            </button>
          </div>
        </div>
      </section>
      {/* Advantages Section Here */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-blue-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                H.Carrier ADVANTAGE
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
                Attach mini trucks or bike <br></br>Earn money by delivering
                goods, courier and packages. Get a part time or full time
                delivery job
              </p>
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
                Regular Trips
              </h2>
              <p className="text-base leading-relaxed mt-2">
                With our growing presence across multiple cities, we always have
                our hands full! This means you will never run out of trips.
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
                Better Earning
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Earn more by partnering with the best! Regular trips and
                efficient service can grow your earnings!
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
                On-Time Payment
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Be assured to receive all payments on time & get the best in
                class support, when you attach mini truck with Porter.
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
      {/* Easy Section Here  */}
      <section className="text-gray-600 body-font">
        s
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              className="object-cover object-center h-full w-full"
              src="https://d3o1t8vp7n8wsg.cloudfront.net/assets/website_revamp/partners/driver_experience-87051334459376357b6125e2b776e61175461d3db60f2a5fdad972d51839137e.gif"
            />
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Attach your two wheeler or commercial vehicle
                </h2>
                <p className="leading-relaxed text-base">
                  If you got a 2 wheeler, or a tata ace commercial vehicle, you
                  are good to go! With Porter, get a delivery job and deliver
                  goods, packages, and courier.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  No more waiting on the stand
                </h2>
                <p className="leading-relaxed text-base">
                  Attach tata ace with Porter to have a steady stream of trips
                  with minimum assured income and added incentives, so that
                  there is no waiting and idle time at the stand!
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  No more bargaining. Standard Rates
                </h2>
                <p className="leading-relaxed text-base">
                  The rates and calculation methods are standardized and
                  completely transparent. No more wasting time in fixing the
                  rates for every trip.
                </p>
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Hassle Free Navigation
              </h2>
              <p className="leading-relaxed text-base">
                With our GPS-based navigation you can drive anywhere across your
                city without worrying about the directions. Get real-time
                navigation assistance on the go!
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Work Section Here  */}
      <section className="text-grey-500 body-font bg-slate-100">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-blue-600 tracking-widest font-medium title-font mb-1">
              BENIFITS
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-blue-950">
              ADDITIONAL BENEFITS
            </h1>
          </div>
          <div className="flex flex-col md:flex-row m-4">
            <div className="p-4 md:w-1/3 hover:shadow-2xl  ">
              <div className="flex rounded-lg h-full p-2 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 flex flex-row items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                    <MdOutlineHomeWork />
                  </div>
                  <h2 className="text-blue-950 text-lg title-font font-medium">
                    Health Care Assistance
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base  ">
                    Get healthcare benefits for you and your family with mini
                    truck attachment.
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 hover:shadow-2xl  ">
              <div className="flex rounded-lg h-full p-2 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 flex flex-col items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                    <MdOutlineHomeWork />
                  </div>
                  <h2 className="text-blue-950 text-lg title-font font-medium">
                    Insurance
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base  ">
                    Save money with reduced annual maintenance and insurance
                    costs on your vehicle.
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 hover:shadow-2xl  ">
              <div className="flex rounded-lg h-full  p-2 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full font-extrabold bg-blue-500 text-white flex-shrink-0">
                    <BsCheckCircle />
                  </div>
                  <h2 className="text-blue-950 text-lg title-font font-medium">
                    Fuel card for Savings
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Save big on fuel costs with our smart fuel card and increase
                    your profit margins!
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 hover:shadow-2xl ">
              <div className="flex rounded-lg h-full  p-2 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full font-extrabold bg-blue-500 text-white flex-shrink-0">
                    <BsTruck />
                  </div>
                  <h2 className="text-blue-950 text-lg title-font font-medium">
                    Discount on Vehicle Purchase
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Get major discounts on purchase of new vehicles. Add to your
                    fleet and grow your business!
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

      {/* Testimonial Section Here */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
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

export default Dp;
