import React, { useState } from "react";
import UserHeader from "../components/UserHeader/UserHeader";
import AddCar from "../components/AddCar/AddCar";
import AllCarsSection from "../components/AllCarsSection/AllCarsSection";
import CarView from "../components/CarView/CarView";

export default function UserLayout({ setIsLoggedIn }) {
  const [openAddCar, setOpenAddCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isCarClicked, setIsCarClicked] = useState(false);

  const handleAddCarClick = () => {
    setOpenAddCar(true);
  };

  const handleAddCarClose = () => {
    setOpenAddCar(false);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsCarClicked(true);
  };
  const handleCarViewClose = () =>setIsCarClicked(false);

  return (
    <>
      <UserHeader
        setIsLoggedIn={setIsLoggedIn}
        handleAddCarClick={handleAddCarClick}
      />
      {openAddCar && (
        <AddCar handleAddCarClose={handleAddCarClose}/>
      )}

      {isCarClicked ? (
        <CarView car={selectedCar} handleCarViewClose={handleCarViewClose} />
      ) : (
        <AllCarsSection handleCarClick={handleCarClick} />
      )}
    </>
  );
}
