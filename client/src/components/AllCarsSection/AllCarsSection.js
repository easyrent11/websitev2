import React, { useContext } from "react";
import { AllCarsContext } from "../../contexts/AllCarsContext";
import Car from "../Car/Car";
import styles from "./allcarsSection.module.css";

export default function AllCarsSection() {
  const { allCars } = useContext(AllCarsContext);
  console.log("All cars", allCars);

  if (!allCars || allCars.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.noCars}>No cars Yet...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <article className={styles.carList}>
        {allCars.map((car, index) => (
          <Car key={index} car={car} />
        ))}
      </article>
    </div>
  );
}
