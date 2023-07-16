import React from 'react'
import classes from "./fullscreennav.module.css"
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
export default function FullScreenNav({ openLogin, openRegister }) {
  const btnStyle1 = {
    margin: "1rem",
    borderRadius: "5px",
    border: "none",
    width: "25%",
    cursor: "pointer",
    padding: "1rem",
  };

  const btnStyle2 = {
    backgroundColor: "black",
    color: "white",
    margin: "1rem",
    padding: "1rem",
    border: "none",
    width: "25%",
    cursor: "pointer",
    borderRadius: "5px",
  };
  return (
    <nav className={classes.nav}>
      <article className={classes.local_links}>
        <Logo />
        <a className={classes.a} href="/">
          Home
        </a>
        <a className={classes.a} href="#about">
          {" "}
          About
        </a>
        <a className={classes.a} href="/">
          Contact
        </a>
      </article>
      <article className={classes.register_login_div}>
        <Button name="login" style={btnStyle1} onClick={openLogin}>
          Login
        </Button>
        <Button name="register" style={btnStyle2} onClick={openRegister}>
          Register
        </Button>
      </article>
    </nav>
  );
}
