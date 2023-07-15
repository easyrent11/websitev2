import React, { useContext, useState } from "react";
import { AllCarsContext } from "../../contexts/AllCarsContext";
import Car from "../Car/Car";
import CarView from "../CarView/CarView";
import styles from "./allcarsSection.module.css";

export default function AllCarsSection() {
  const { allCars } = useContext(AllCarsContext);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarClick = (car) => {
    setSelectedCar(car);
  };

  if (!allCars || allCars.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.noCars}>No cars yet...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {selectedCar ? (
        <CarView car={selectedCar} />
      ) : (
        <article className={styles.carList}>
          {allCars.map((car, index) => (
            <Car
              key={index}
              car={car}
              handleCarClick={() => handleCarClick(car)}
            />
          ))}
        </article>
      )}
    </div>
  );
}
