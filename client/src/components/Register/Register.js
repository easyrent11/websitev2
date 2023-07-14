import React, { useState } from "react";
import Login from "../Login/Login";
import { register } from "../../api/usersApi";
import { Cities } from "../../res/Cities";
import Select from "react-select";
import axios from "axios";
import styles from "./register.module.css";

export default function Register({ onClose, openLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [city, setCity] = useState("");
  const [city_name, setCityName] = useState("");
  const [selectedCityLabel, setSelectedCityLabel] = useState("Choose a city");
  const [streetName, setStreetName] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption.value);
    setCityName(selectedOption.label);
    setSelectedCityLabel(selectedOption.label);
  };

  const handleImageUpload = (event) => {
    setProfilePicture(event.target.files[0]);
  };


  const handleRegister = (e) => {
    e.preventDefault();

    // Validate the password match
    if (password !== verifyPassword) {
      console.log(
        "You entered different passwords. Please verify the password correctly."
      );
      return;
    }

    // Create a new FormData instance
    const formData = new FormData();
    formData.append("profileImage", profilePicture);

    // Send the form data with the image to the server for registration
    axios
      .post("http://localhost:3001/user/uploadProfileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { fileUrl } = response.data;
        const pathname = new URL(fileUrl).pathname;
        const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
        const registerInfo = {
          id: governmentId,
          phone_number: phoneNumber,
          driving_license: drivingLicense,
          picture: filename,
          email: email,
          password: password,
          city_code: city,
          city_name: city_name, // Add the city name to the registerInfo object
          street_name: streetName,
          first_name: firstName,
          last_name: lastName,
        };

        // After successful image upload, proceed with registration
        register(registerInfo)
          .then((res) => {
            console.log(res.data.message);
            onClose();
          })
          .catch((err) => console.log(err.data.message));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className={styles.register}>
      <form className={styles.form}>
        <div className={styles.closeButton}>
          <button
            type="button"
            className={styles.closeButtonStyle}
            onClick={onClose}
          >
            X
          </button>
        </div>
        <h2 className={styles.title}>Register</h2>
        <p className={styles.loginPrompt}>
          Already have an account?
          <button className={styles.loginButton} onClick={openLogin}>
            Log in
          </button>
        </p>
        <div className={styles.grid}>
          <div>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              className={styles.input}
              value={firstName}
              pattern="^[a-zA-Z]{2,}$"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              value={lastName}
              pattern="^[a-zA-Z]{2,}$"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              className={styles.input}
              value={phoneNumber}
              pattern="^05\d{1}-?\d{7}$"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Verify Password</label>
            <input
              type="password"
              className={styles.input}
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Choose a City</label>
            <Select
              className={styles.input}
              id="city"
              value={{ value: city, label: selectedCityLabel }}
              onChange={handleCityChange}
              noOptionsMessage={() => "Not Found"}
              options={Cities}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Street Name</label>
            <input
              type="text"
              className={styles.input}
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Profile Picture</label>
            <input
              type="file"
              className={styles.input}
              name="profilepicture"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <label className={styles.label}>Government ID</label>
            <input
              type="text"
              className={styles.input}
              value={governmentId}
              pattern="^\d{9}$"
              required
              onChange={(e) => setGovernmentId(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Driving License</label>
            <input
              type="text"
              className={styles.input}
              value={drivingLicense}
              required
              onChange={(e) => setDrivingLicense(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleRegister}
          className={styles.registerButton}
        >
          Register
        </button>
      </form>
      {showLogin && <Login onClose={toggleLogin} />}
    </div>
  );
}
