import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { TbManualGearbox } from "react-icons/tb";
import { FaCogs } from "react-icons/fa";
import CarView from "../CarView/CarView";

export default function Car({ car }) {
  const [openCarView, setOpenCarView] = useState(false);
  const [platesNumber, setPlatesNumber] = useState("");

  const handleCarClick = (platesNumber) => {
    setOpenCarView(true);
    setPlatesNumber(platesNumber);
  };

  if (openCarView) {
    return <CarView platesNumber={platesNumber} />;
  }

  return (
    <div className="flex flex-col w-5/12 items-center justify-center rounded-md bg-white m-4 p-2">
      <div onClick={() => handleCarClick(car.Plates_Number)}>
        <figure className="flex flex-col items-center w-full h-40 justify-center">
          <img
            className="w-full h-full rounded-md mt-8"
            src={`http://localhost:3001/images/${car.car_urls[0]}`}
            alt="Car Image"
          />
        </figure>
      </div>

      {/* Car details */}
      <div className="flex flex-col justify-center w-full m-4 p-1">
        <div className="p-2">
          <h2 className="text-2xl">
            {car.Manufacturer_Code} {car.model_code}
          </h2>
        </div>

        <p className="p-2 text-md font-sans text-[#6d6d6d]">{car.Year}</p>

        <div className="flex justify-around w-full mb-2 p-2">
          <p className="m-1 ">
            <PersonIcon className="m-1 text-[#777777]" />
            {car.Seats_Amount}
          </p>
          <p className="flex items-center">
            <FaCogs className="m-1 text-2xl text-[#777777]" />
            {car.Engine_Type}
          </p>
          <p className="flex items-center">
            <TbManualGearbox className="m-1 text-2xl text-[#777777]" />
            {car.Transmission_type}
          </p>
        </div>

        <div className="flex items-center justify-between p-2">
          <p className="text-[#00215e]">₪{car.Rental_Price_Per_Day}/day</p>
          <button className="bg-black text-white p-2 rounded-md">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
