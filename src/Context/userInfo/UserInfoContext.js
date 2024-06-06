// MyContext.js
import React, { createContext, useContext, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [pAddress, setpAddress] = useState(null);
  const [dAddress, setdAddress] = useState(null);
  const [moNumber, setmoNumber] = useState("");
  const [city, setCity] = useState(null);
  const [requirement, setRequierment] = useState(null);
  const [shiftingDate, setShiftingDate] = useState("");
  const [distance, setDistance] = useState(0);
  const [payment, setPayment] = useState(0);
  const [pcoordinates, setpCoordinates] = useState([]);
  const [dcoordinates, setdCoordinates] = useState([]);
  const [orderVehicle, setorderVehicle] = useState({});

  const [nameError, setNameError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [requirementError, setRequirementError] = useState(null);
  const [moNumberError, setmoNumberError] = useState(null);
  const [shiftingDateError, setShiftingDateError] = useState(null);

  return (
    <UserInfoContext.Provider
      value={{
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
        payment,
        setPayment,
        pcoordinates,
        setpCoordinates,
        dcoordinates,
        setdCoordinates,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(UserInfoContext);
};
