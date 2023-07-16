import React from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import classes from './userfullnav.module.css';

export default function UserFullNav({ setIsLoggedIn, handleAddCarClick }) {
  const btnLogoutStyle = {
    backgroundColor: "black",
    color: "white",
    margin: "1rem",
    border: "none",
    width: "10%",
    cursor: "pointer",
    borderRadius: "5px",
  };
  const navBtnsStyle = {
    margin: "1rem",
    borderRadius: "5px",
    border: "none",
    width: "10%",
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
      <Logo />
      <div className={classes.div}>
        <a href="/" className={classes.a}>
          Home
        </a>
        <Button
          name="Add Car"
          style={navBtnsStyle}
          onClick={handleOpenAddCar}
        ></Button>
        <Button name="Logout" style={btnLogoutStyle} onClick={logout}></Button>
      </div>
    </nav>
  );
}
