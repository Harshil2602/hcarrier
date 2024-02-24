import React from "react";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { SiInstagram } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import { ImGooglePlus } from "react-icons/im";
import Link from "next/link";

function Footer() {
  return (
    <>
      {/* <!-- Footer container --> */}
      <footer className="bg-blue-200 text-center text-blue-900 dark:bg-blue-200 dark:text-blue-900 lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-blue-400 p-4 dark:border-blue-400 lg:justify-between">
          <div className="mr-12 hidden lg:block font-semibold text-2xl">
            <span>H.Carrier</span>
          </div>
          {/* <!-- Social network icons container --> */}
          <div className="flex justify-center ">
            <Link
              className="ms-3"
              href="https://github.com/hrpipaliya"
              target="_blank"
            >
              <BsGithub />
            </Link>
            <Link
              className="ms-3"
              href="https://www.linkedin.com/in/pipaliya-harshil/"
              target="_blank"
            >
              <BsLinkedin />
            </Link>

            <Link
              className="ms-3"
              href="https://www.instagram.com/harshilrpipaliya/"
              target="_blank"
            >
              <SiInstagram />
            </Link>
            <Link className="ms-3" href="/" target="_blank">
              <BsTwitter />
            </Link>
            <Link className="ms-3" href="/" target="_blank">
              <ImGooglePlus />
            </Link>
          </div>
        </div>
        {/* 
  <!-- Main container div: holds the entire content of the footer, including four sections (Tailwind Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* <!-- Tailwind Elements section --> */}
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                H.Carrier
              </h6>
              <p>
                Send anything,
                <br /> anywhere,
                <br /> anytime
              </p>
            </div>
            {/* <!-- Useful links section --> */}
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Quick Links
              </h6>
              <p className="mb-4">
                <Link className=" text-blue-900 dark:text-blue-900" href="/">
                  Home
                </Link>
              </p>
              <p className="mb-4">
                <Link className=" text-blue-900 dark:text-blue-900" href="/PnM">
                  Packers & Movers
                </Link>
              </p>
              <p className="mb-4">
                <Link className=" text-blue-900 dark:text-blue-900" href="/Dp">
                  Driver Partners
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  className=" text-blue-900 dark:text-blue-900"
                  href="/Contact"
                >
                  Contact Us
                </Link>
              </p>
            </div>
            {/* <!-- Products section --> */}
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Support
              </h6>

              <p className="mb-4">
                <Link
                  className=" text-blue-900 dark:text-blue-900"
                  href="/Contact"
                >
                  Privacy Policy
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  className=" text-blue-900 dark:text-blue-900"
                  href="/Contact"
                >
                  Terms of Service
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  className=" text-blue-900 dark:text-blue-900"
                  href="/Contact"
                >
                  Insurance FAQs
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  className=" text-blue-900 dark:text-blue-900"
                  href="/Contact"
                >
                  Driver Partner Terms & Conditions
                </Link>
              </p>
            </div>
            {/* <!-- Contact section --> */}
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Contact
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                Gandhinagar,Gujrat ,Ind
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                pipaliyaharshil26@gmail.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                +91 1234567890
              </p>
              <p className="flex items-center justify-center md:justify-start">
                +91 4567891230
              </p>
            </div>
          </div>
        </div>

        {/* <!--Copyright section--> */}
        <div className="bg-blue-100 p-4 text-center dark:bg-blue-100">
          <span>© 2023 : </span>
          <a
            className="font-semibold ms-1 text-blue-900 dark:text-blue-900"
            href="https://tailwind-elements.com/"
          >
            H.Carrier
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
