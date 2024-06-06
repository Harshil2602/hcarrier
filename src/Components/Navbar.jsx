import { useState, useEffect, Fragment } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { FaTruck } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingBar from "react-top-loading-bar";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const router = useRouter();
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    const token = localStorage.getItem("token");

    if (token) {
      setuser({ value: token });
      setkey(Math.random());
    }
  }, [router.query]);

  const setRole = () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    if (decoded.role == "User") {
      setIsUser(true);
    } else if (decoded.role == "Driver") {
      setIsDriver(true);
    } else {
      setIsAdmin(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setuser({ value: null });
    setkey(Math.random());
    router.push({
      pathname: "/",
    });
  };

  return (
    <div className=" w-full z-30 shadow-sm  sticky top-0">
      <LoadingBar
        color="#007aff"
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className=" w-full px-2 sm:px-6 lg:px-2">
              <div className="relative flex h-14 items-center justify-between">
                <div className="relative inset-y-0 left-0 flex items-center sm:hidden lg:justify-start">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 ms-3 items-center justify-center sm:items-stretch lg:justify-start ">
                  <div className="flex flex-shrink-0 items-center text-4xl text-blue-500">
                    <FaTruck />
                  </div>
                  <div className="flex flex-shrink-0 items-center text-lg ">
                    <Link className="" href="/">
                      <span className="ms-1 items-center text-2xl font-bold text-blue-950">
                        H.
                      </span>
                      <span className="items-center text-2xl font-bold text-blue-600 ">
                        Carrier
                      </span>
                    </Link>
                  </div>

                  <div className="hidden sm:ml-6 sm:block ">
                    <div className="flex space-x-5 navlinks">
                      <Link
                        href={"/"}
                        className={
                          router.pathname === "/"
                            ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                            : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                        }
                      >
                        Home
                      </Link>

                      <Link
                        href={"/PnM"}
                        className={
                          router.pathname === "PnM"
                            ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                            : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                        }
                      >
                        Packers & Movers
                      </Link>

                      <Link
                        href={"/Dp"}
                        className={
                          router.pathname === "Dp"
                            ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                            : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                        }
                      >
                        Driver Partners
                      </Link>

                      <Link
                        href={"/Contact"}
                        className={
                          router.pathname === "Contact"
                            ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                            : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                        }
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
                {user.value && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full  text-3xl text-blue-500">
                          <span className="sr-only">Open user menu</span>
                          <RxAvatar />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-20 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/Orders/MyOrders"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Oders
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                className={classNames(
                                  active ? "bg-gray-100 text-left w-full" : "",
                                  "block px-4 py-2 text-sm text-gray-700 text-left w-full"
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
                {!user.value && (
                  <div className=" absolute inset-y-0 right-0 flex items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Link href="/Auth/login">
                      <button className="bg-blue-500 text-white font-medium p-2 px-3 rounded-md text-center ">
                        Login
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="flex flex-col text-center space-y-1 px-2 pb-3 pt-2">
                <Link
                  href={"/"}
                  className={
                    router.pathname === "Home"
                      ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                      : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                  }
                >
                  Home
                </Link>
                <Link
                  href={"/PnM"}
                  className={
                    router.pathname === "PnM"
                      ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                      : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                  }
                >
                  Packers & Movers
                </Link>
                <Link
                  href={"/Dp"}
                  className={
                    router.pathname === "Dp"
                      ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                      : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                  }
                >
                  Driver Partners
                </Link>
                <Link
                  href={"/Contact"}
                  className={
                    router.pathname === "Contact"
                      ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                      : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                  }
                >
                  Contact Us
                </Link>
                <Link
                  href={"/Dashboard"}
                  className={
                    router.pathname === "Dashboard"
                      ? "  active: text-blue-500 rounded-md px-3 py-2 text-lg font-semibold underline-offset-1"
                      : "hover:text-blue-500  text-blue-950 rounded-md px-3 py-2 text-lg font-semibold"
                  }
                >
                  Dashboard
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
