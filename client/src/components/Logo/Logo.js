import React from "react";
import logoImage from "../../assets/logo.png"
import classes from './logo.module.css';

export default function Logo() {
  return (
    <a href="#">
      <figure className={classes.figure}>
        <img className={classes.img} src={logoImage} alt="Logo" />
        <figcaption className={classes.figcaption}> EasyRent</figcaption>
      </figure>
    </a>
  );
}
