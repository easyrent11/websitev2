import React from "react";
import UserFullNav from "../UserFullNav/UserFullNav";
import classes from "./userheader.module.css";
import UserDropDownNav from "../UserDropDownMenu/UserDropDown";


export default function UserHeader({ setIsLoggedIn, handleAddCarClick }) {

  return (
    <header className={classes.header}>
      <UserFullNav setIsLoggedIn={setIsLoggedIn} handleAddCarClick={handleAddCarClick}/>
      <UserDropDownNav setIsLoggedIn={setIsLoggedIn} handleAddCarClick={handleAddCarClick}/>
    </header>
  );
}
