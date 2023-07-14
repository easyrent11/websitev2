import React, { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import classes from "./userheader.module.css";
import Button from "../Button/Button";

export default function UserHeader({setIsLoggedIn}) {

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }


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

  
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Logo />
        <div className={classes.div}>
          <a href="/" className={classes.a}>
            Home
          </a>
          <Button name="Add Car" style={navBtnsStyle}></Button>
          <Button
            name="Logout"
            style={btnLogoutStyle}
            onClick={logout}
          ></Button>
        </div>
      </nav>
    </header>
  );
}
