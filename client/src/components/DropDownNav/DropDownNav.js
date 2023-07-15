import React, { useState } from "react";
import classes from "./dropdown.module.css";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import { FaBars } from "react-icons/fa";

export default function DropDownNav({ openLogin, openRegister }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const btnStyle1 = {
    margin: "1rem",
    borderRadius: "5px",
    border: "none",
    width: "10%",
    cursor: "pointer",
    padding: "0.5rem",
  };

  const btnStyle2 = {
    backgroundColor: "black",
    color: "white",
    margin: "1rem",
    padding: "0.5rem",
    border: "none",
    width: "10%",
    cursor: "pointer",
    borderRadius: "5px",
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
            <a className={classes.a} href="#about">
              About
            </a>
            <a className={classes.a} href="/">
              Contact
            </a>
            <Button name="login" style={btnStyle1} onClick={openLogin} />
            <Button name="register" style={btnStyle2} onClick={openRegister} />
          </div>
        )}
      </article>
    </nav>
  );
}
