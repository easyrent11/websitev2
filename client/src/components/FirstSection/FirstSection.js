import React from "react";
import MainTitle from '../MainTitle/MainTitle';
import SearchCar from '../SearchCar/SearchCar';
import styles from "./firstsection.module.css";

export default function FirstSection() {
  return (
    <>
      <div className={styles.div}>
        <article className={styles.article}>
        <SearchCar/>
        <MainTitle/>
        </article>
      </div>
    </>
  )
}
