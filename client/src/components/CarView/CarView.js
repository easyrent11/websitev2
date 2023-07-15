import React, { useContext } from "react";
import { Carousel } from "@material-tailwind/react";
import { AllCarsContext } from "../contexts/AllCarsContext";
import { UserProfileDetails } from "../contexts/UserProfileDetails";
import PersonIcon from "@mui/icons-material/Person";
import { TbManualGearbox } from "react-icons/tb";
import { FaCogs } from "react-icons/fa";
import styles from "./CarView.module.css"; // Import the CSS module file

export default function CarView({ platesNumber }) {
  const { userDetails } = useContext(UserProfileDetails);
  const userFirstName = userDetails.first_name;
  const userProfileImage = userDetails.picture;

  const { allCars } = useContext(AllCarsContext);
  let flag = false;
  const car = allCars.find(
    (car) => Number(car.Plates_Number) === Number(platesNumber)
  );
  console.log(car);
  console.log("allcars= ", allCars);

  return (
    <div className={styles.carViewContainer}>
      <section className={styles.carouselSection}>
        <Carousel className={styles.carousel}>
          {!flag ? (
            car.car_urls.map((image, index) => (
              <figure key={index} className={styles.carouselFigure}>
                <img
                  src={`http://localhost:3001/images/${image}`}
                  alt={`Car Pic ${index + 1}`}
                  className={styles.carouselImage}
                />
              </figure>
            ))
          ) : (
            <figure>
              <img src="/images/noImages.png" alt="No Images" />
            </figure>
          )}
        </Carousel>
      </section>

      <div className={`flex ${styles.carDetails}`}>
        <section className={styles.ownerSection}>
          <h2 className={styles.ownerTitle}>Car Owner:</h2>
          <figure className={styles.ownerInfo}>
            <img
              src={`http://localhost:3001/images/${userProfileImage}`}
              className={styles.ownerImage}
              alt="Owner Profile"
            />
            <figcaption className={styles.ownerName}>
              {userFirstName}
            </figcaption>
          </figure>

          <div className={styles.carInfo}>
            <h2 className={styles.carTitle}>
              {car.Manufacturer_Code} {car.model_code}
            </h2>
            <p className={styles.carYear}>Year: {car.Year}</p>
          </div>

          <div className={styles.carFeatures}>
            <ul className={styles.featureList}>
              <li>
                <PersonIcon className={styles.featureIcon} />
                {car.Seats_Amount}
              </li>
              <li>
                <TbManualGearbox className={styles.featureIcon} />
                {car.Transmission_type}
              </li>
              <li>
                <FaCogs className={styles.featureIcon} />
                {car.Engine_Type}
              </li>
            </ul>
          </div>

          <div className={styles.rentButtonContainer}>
            <button className={styles.rentButton}>Rent Now</button>
          </div>
        </section>

        <section className={styles.bookingSection}>
          <div className={styles.bookingHeader}>
            <h2 className={styles.bookingTitle}>Book this car</h2>
          </div>

          <div className={styles.bookingForm}>
            <div className={styles.bookingFormItem}>
              <label className={styles.bookingLabel}>From Date:</label>
              <input className={styles.bookingInput} type="date" />
            </div>

            <div className={styles.bookingFormItem}>
              <label className={styles.bookingLabel}>To Date:</label>
              <input className={styles.bookingInput} type="date" />
            </div>

            <p className={styles.bookingNote}>
              You'll pickup and return the key by meeting with the owner face to
              face.
            </p>

            <section className={styles.bookingPrice}>
              <div>
                <p className={styles.bookingPriceLabel}>
                  Total Price (including fees):
                </p>
                <p className={styles.bookingPriceValue}>
                  ₪{car.Rental_Price_Per_Day}/day
                </p>
              </div>

              <div>
                <button className={styles.bookingButton}>Send Request</button>
                <button className={styles.bookingButton}>
                  Start Chat with Seller
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
