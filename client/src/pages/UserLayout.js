import React, { useState } from "react";
import styles from "./userlayout.module.css";
import UserHeader from "../components/UserHeader/UserHeader";
import AddCar from "../components/AddCar/AddCar";
import AllCarsSection from "../components/AllCarsSection/AllCarsSection"

export default function UserLayout({ setIsLoggedIn }) {
  const [openAddCar, setOpenAddCar] = useState(false); // New useState for openAddCar
  return (
    <>
      <UserHeader setIsLoggedIn={setIsLoggedIn} setOpenAddCar={setOpenAddCar} />
      {openAddCar && <AddCar setOpenAddCar={setOpenAddCar} />}
      <AllCarsSection/>
    </>
  );
}
