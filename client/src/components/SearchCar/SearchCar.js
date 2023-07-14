import React, { useState, useContext } from "react";
import Select from "react-select";
import { Cities } from "../../res/Cities";
import { searchCars } from "../../api/carsApi";
import { SearchCarListResult } from "../../contexts/SearchCarListResult";
import styles from "./searchcar.module.css";
import Button from "../Button/Button";
export default function SearchCar() {

  // styles for the search button 
  const btnStyles = {
      backgroundColor: 'black',
      color: 'white',
      fontSize:'1.5rem',
      padding: '1rem',
      border: 'none',
      borderRadius: '0.25rem',
      width: '100%'
  }

  const { updateCarList } = useContext(SearchCarListResult);
  const sortedCities = Cities.sort((a, b) => a.label.localeCompare(b.label));

  const [city, setCity] = useState("");
  const [selectedCityLabel, setSelectedCityLabel] = useState("Choose a city");
  const [pickupDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption.value);
    setSelectedCityLabel(selectedOption.label);
  };

  const handlePickUpDateChange = (e) => {
    setPickUpDate(e.target.value);
  };

  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
  };

  const handleToTimeChange = (e) => {
    setToTime(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      city: city,
      pickupDate: pickupDate,
      returnDate: returnDate,
      startTime: fromTime,
      endTime: toTime,
    };

    searchCars(requestData)
      .then((res) => {
        console.log(res.data);
        updateCarList(res.data);
      })
      .catch((err) => console.log("Failed", err));
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.inputContainer}>
        <Select
          id="city"
          value={{ value: city, label: selectedCityLabel }}
          onChange={handleCityChange}
          noOptionsMessage={() => "Not Found"}
          options={sortedCities}
          className={styles.select}
        />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="date"
          id="pickupdate"
          value={pickupDate}
          onChange={handlePickUpDateChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="time"
          id="fromtime"
          value={fromTime}
          onChange={handleFromTimeChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={handleReturnDateChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="time"
          id="totime"
          value={toTime}
          onChange={handleToTimeChange}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button type="submit" style={btnStyles} name="Search"> </Button>
      </div>
    </form>
  );
}
