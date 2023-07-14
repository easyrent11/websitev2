import React, { useState } from "react";
import { addCar } from "../../api/usersApi";
import Button from "../Button/Button";
import axios from "axios";
import { CarMakesAndModels } from "../../res/CarMakesAndModels";
import Select from "react-select";
import styles from "./addcar.module.css";

export default function AddCar() {
  const btnStyle = {
    backgroundColor: "#cc6200",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "0.5rem",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "backgroundColor 0.3s ease",
  };
  // getting the user ID
  const userId = localStorage.getItem("userId");

  const sortedManufacturers = CarMakesAndModels.map((make) => ({
    value: make.brand,
    label: make.brand,
  })).sort((a, b) => a.label.localeCompare(b.label));
  const [manufacturers, setManufacturers] = useState(sortedManufacturers);
  const [models, setModels] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [platesNumber, setPlatesNumber] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [seatsAmount, setSeatsAmount] = useState("");
  const [engineType, setEngineType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [description, setDescription] = useState("");
  const [rentalPricePerDay, setRentalPricePerDay] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [SMassge, setSMassege] = useState("");
  const [EMassge, setEMassege] = useState("");

  const handleManufacturerChange = (selectedOption) => {
    setSelectedManufacturer(selectedOption);
    const manufacturerModels = CarMakesAndModels.find(
      (make) => make.brand === selectedOption.value
    ).models;
    setModels(manufacturerModels);
    setSelectedModel(""); // Clear the selected model when the manufacturer changes
  };
  const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption.value);
  };

  const handlePlatesNumberChange = (event) => {
    setPlatesNumber(event.target.value);
  };

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption);
  };

  const handleColorChange = (selectedOption) => {
    setColor(selectedOption);
  };

  const handleSeatsAmountChange = (selectedOption) => {
    setSeatsAmount(selectedOption);
  };

  const handleEngineTypeChange = (selectedOption) => {
    setEngineType(selectedOption);
  };

  const handleTransmissionTypeChange = (selectedOption) => {
    setTransmissionType(selectedOption);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleRentalPricePerDayChange = (event) => {
    setRentalPricePerDay(event.target.value);
  };

  const uploadImages = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("carpics", files[i]);
    }

    return axios.post("http://localhost:3001/cars/uploadImages", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    const files = Array.from(fileList);
    setUploadedImages(files); // Store the selected files temporarily
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    uploadImages(uploadedImages)
      .then((response) => {
        console.log("respense ===    " , response);
        const { files } = response.data;
        const filenames = files.map((url) => {
          const pathname = new URL(url).pathname;
          return pathname.substring(pathname.lastIndexOf("/") + 1);
        });

        const carData = {
          Manufacturer_Name: selectedManufacturer
            ? selectedManufacturer.value
            : "",
          Manufacturer_Code: selectedManufacturer
            ? selectedManufacturer.value.toLowerCase()
            : "",
          model_name: selectedModel,
          model_code: selectedModel ? selectedModel.toLowerCase() : "",
          Plates_Number: platesNumber,
          Year: year.value,
          Color: color.value,
          Seats_Amount: seatsAmount.value,
          Engine_Type: engineType.value,
          Transmission_type: transmissionType.value,
          Description: description,
          Rental_Price_Per_Day: rentalPricePerDay,
          Renter_Id: userId,
          image_url: filenames,
        };

        addCar(carData)
          .then((res) => {
            console.log(res);
            setSMassege(res.data.message);
          })
          .catch((err) => {
            setEMassege(err.response.data.message);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.addCarContainer}>
      <h2 className={styles.title}>Add Car</h2>

      <form className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="manufacturer">
            Manufacturer:
          </label>
          <Select
            value={selectedManufacturer}
            onChange={handleManufacturerChange}
            options={manufacturers}
            placeholder="Select Manufacturer"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="model">
            Model:
          </label>
          <Select
            options={models.map((model) => ({
              value: model,
              label: model,
            }))}
            value={
              selectedModel
                ? { value: selectedModel, label: selectedModel }
                : null
            }
            onChange={handleModelChange}
            isDisabled={!selectedManufacturer}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="platesNumber">
            Plates Number:
          </label>
          <input
            className={styles.input}
            id="platesNumber"
            type="number"
            value={platesNumber}
            onChange={handlePlatesNumberChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="year">
            Year:
          </label>
          <Select
            value={year}
            onChange={handleYearChange}
            options={Array.from({ length: 2025 - 1990 }, (_, index) => ({
              value: 1990 + index,
              label: (1990 + index).toString(),
            }))}
            placeholder="Select Year"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="color">
            Color:
          </label>
          <Select
            value={color}
            onChange={handleColorChange}
            options={[
              "red",
              "black",
              "blue",
              "green",
              "yellow",
              "orange",
              "purple",
              "pink",
              "gray",
              "brown",
              "white",
            ].map((colorOption) => ({
              value: colorOption,
              label: colorOption,
            }))}
            placeholder="Select Color"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="seatsAmount">
            Seats Amount:
          </label>
          <Select
            value={seatsAmount}
            onChange={handleSeatsAmountChange}
            options={Array.from({ length: 15 - 2 + 1 }, (_, index) => ({
              value: 2 + index,
              label: (2 + index).toString(),
            }))}
            placeholder="Select Seats Amount"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="engineType">
            Engine Type:
          </label>
          <Select
            value={engineType}
            onChange={handleEngineTypeChange}
            options={["Petrol", "Diesel", "Electric", "Hybrid"].map(
              (engineOption) => ({
                value: engineOption,
                label: engineOption,
              })
            )}
            placeholder="Select Engine Type"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="transmissionType">
            Transmission Type:
          </label>
          <Select
            value={transmissionType}
            onChange={handleTransmissionTypeChange}
            options={["Manual", "Auto"].map((transmissionOption) => ({
              value: transmissionOption,
              label: transmissionOption,
            }))}
            placeholder="Select Transmission Type"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            Description:
          </label>
          <textarea
            className={styles.textarea}
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="rentalPricePerDay">
            Rental Price Per Day:
          </label>
          <input
            className={styles.input}
            id="rentalPricePerDay"
            type="number"
            value={rentalPricePerDay}
            onChange={handleRentalPricePerDayChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="carimages">
            Choose Car Images:
          </label>
          <input
            id="carimages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <Button
            onClick={handleSubmit}
            style={btnStyle}
            type="submit"
            name="Add Car"
          ></Button>
        </div>
      </form>
    </div>
  );
}
