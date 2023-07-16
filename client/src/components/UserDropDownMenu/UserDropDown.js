import React, { useState } from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import { FaBars } from "react-icons/fa";
import classes from './userdropdown.module.css';

export default function UserDropDownNav({ setIsLoggedIn, handleAddCarClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const btnStyle1 = {
    margin: "1rem",
    border: "none",
    width: "100%",
    cursor: "pointer",
    borderRadius: '10px',
    padding: "1rem",
  };

  const btnStyle2 = {
    backgroundColor: "black",
    color: "white",
    margin: "1rem",
    padding: "0.7rem",
    border: "none",
    width: "100%",
    borderRadius: '10px',
    cursor: "pointer",
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const handleOpenAddCar = () => {
    handleAddCarClick();
  };

  return (
    <nav className={classes.nav}>
      <article className={classes.logoArticle}>
        <Logo/>
      </article>
      <article className={classes.dropArticle}>
        <div className={classes.dropdown} onClick={toggleDropdown}>
          <FaBars className={classes.dropdownIcon}></FaBars>
        </div>
        {dropdownOpen && (
          <div className={classes.dropdownContent}>
            <a className={classes.a} href="/">
              Home
            </a>
            <Button name="Add Car" style={btnStyle1} onClick={handleOpenAddCar} />
            <Button name="Logout" style={btnStyle2} onClick={logout} />
          </div>
        )}
      </article>
    </nav>
  );
}
