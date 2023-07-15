import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { TbManualGearbox } from "react-icons/tb";
import { FaCogs } from "react-icons/fa";
import styles from "./car.module.css";
import Button from "../Button/Button";

export default function Car({ car, handleCarClick }) {
  const btnStyle = {
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '0.5rem',
      width:'30%',
      borderRadius: '0.25rem'
    };
  
  return (
    <div className={styles.carContainer} onClick={() => handleCarClick(car)}>
      <figure className={styles.carImageContainer}>
        <img
          className={styles.carImage}
          src={`http://localhost:3001/images/${car.car_urls[0]}`}
          alt="Car Image"
        />
      </figure>

      <div className={styles.carDetails}>
        <div className={styles.carTitle}>
          <h2 className={styles.carModel}>
            {car.Manufacturer_Code} {car.model_code}
          </h2>
        </div>

        <p className={styles.carYear}>{car.Year}</p>

        <div className={styles.carInfo}>
          <p className={styles.carInfoItem}>
            <PersonIcon className={styles.carInfoIcon} />
            {car.Seats_Amount}
          </p>
          <p className={styles.carInfoItem}>
            <FaCogs className={styles.carInfoIcon} />
            {car.Engine_Type}
          </p>
          <p className={styles.carInfoItem}>
            <TbManualGearbox className={styles.carInfoIcon} />
            {car.Transmission_type}
          </p>
        </div>
        <p className={styles.carPrice}>₪{car.Rental_Price_Per_Day}/day</p>
        <div className={styles.carPriceContainer}>
          <Button style={btnStyle} name="Rent Now"></Button>
        </div>
      </div>
    </div>
  );
}
