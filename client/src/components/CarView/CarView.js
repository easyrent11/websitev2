import React, { useContext, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AllCarsContext } from '../../contexts/AllCarsContext';
import { UserProfileDetails } from '../../contexts/UserProfileDetails';
import PersonIcon from '@mui/icons-material/Person';
import styles from './carview.module.css';
import { TbManualGearbox } from 'react-icons/tb';
import { FaCogs } from 'react-icons/fa';
import { updateCarDetails } from '../../api/carsApi';
import { CarMakesAndModels } from '../../res/CarMakesAndModels';
import Select from 'react-select';
import Button from '../Button/Button';
export default function CarView({ car }) {
  const { userDetails } = useContext(UserProfileDetails);
  const userFirstName = userDetails.first_name;
  const userProfileImage = userDetails.picture;
  const { allCars } = useContext(AllCarsContext);
  let flag = false;

  // State variables for editable fields and updated values
  const [editMode, setEditMode] = useState(false);
  const [updatedManufacturerCode, setUpdatedManufacturerCode] = useState(car.Manufacturer_Code);
  const [updatedModelCode, setUpdatedModelCode] = useState(car.model_code);
  const [updatedYear, setUpdatedYear] = useState(car.Year);
  const [updatedColor, setUpdatedColor] = useState(car.Color);
  const [updatedSeatsAmount, setUpdatedSeatsAmount] = useState(car.Seats_Amount);
  const [updatedEngineType, setUpdatedEngineType] = useState(car.Engine_Type);
  const [updatedTransmissionType, setUpdatedTransmissionType] = useState(car.Transmission_type);
  const [updatedDescription, setUpdatedDescription] = useState(car.Description);
  const [updatedRentalPrice, setUpdatedRentalPrice] = useState(car.Rental_Price_Per_Day);
  const [updatedRenterId, setUpdatedRenterId] = useState(car.Renter_Id);


  // Style for save button
  const btnStyle = {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '0.5rem',
    width:'20%',
    border:'none',
    margin:'1rem',
    borderRadius: '0.25rem'
  }

  // Function to handle save button click
  const handleSaveClick = () => {
    // Create an object with the updated car details
    const updatedCarDetails = {
      Manufacturer_Code:updatedManufacturerCode.charAt(0).toLowerCase() + updatedManufacturerCode.slice(1),
      model_name: updatedModelCode,
      model_code: updatedModelCode.charAt(0).toLowerCase() + updatedModelCode.slice(1),
      Manufacturer_Name: updatedManufacturerCode.charAt(0).toUpperCase() + updatedManufacturerCode.slice(1),
      Year: updatedYear,
      Color: updatedColor,
      Seats_Amount: updatedSeatsAmount,
      Engine_Type: updatedEngineType,
      Transmission_type: updatedTransmissionType,
      Description: updatedDescription,
      Rental_Price_Per_Day: updatedRentalPrice,
      Renter_Id: updatedRenterId,
      Plates_Number: car.Plates_Number // Make sure to include the Plates_Number in the request
    };
    

    // Call the updateCarDetails API function
    updateCarDetails(updatedCarDetails)
      .then(response => {
        // Handle the successful response here
        console.log("Car details updated successfully");
        setEditMode(false); // Exit edit mode
      })
      .catch(error => {
        // Handle the error here
        console.error("Failed to update car details:", error);
      });
  };

  // Function to get the options for the car models based on the selected manufacturer
  const getModelOptions = () => {
    const selectedBrand = CarMakesAndModels.find(({ brand }) => brand === updatedManufacturerCode);
    if (selectedBrand) {
      return selectedBrand.models.map((model) => ({
        value: model,
        label: model
      }));
    }
    return [];
  };

  return (
    <div className={styles.carViewContainer}>
      <Button>X</Button>
      <section className={styles.carouselSection}>
        <Carousel className={styles.carousel}>
          {!flag ? (
            car.car_urls.map((image, index) => (
              <div key={index} className={styles.carouselFigure}>
                <img
                  src={`http://localhost:3001/images/${image}`}
                  alt={`Car Pic ${index + 1}`}
                  className={styles.carouselImage}
                />
              </div>
            ))
          ) : (
            <div>
              <img src="/images/noImages.png" alt="No Images" />
            </div>
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
              Name: {userFirstName}
            </figcaption>
          </figure>
  
          <div className={styles.carInfo}>
            <h2 className={styles.carTitle}>
              {editMode ? (
                <>
                  <Select
                    value={{
                      value: updatedManufacturerCode,
                      label: updatedManufacturerCode
                    }}
                    onChange={(selectedOption) =>
                      setUpdatedManufacturerCode(selectedOption.value)
                    }
                    options={CarMakesAndModels.map(({ brand }) => ({
                      value: brand,
                      label: brand
                    }))}
                  />
                  {updatedManufacturerCode && (
                    <Select
                      value={{
                        value: updatedModelCode,
                        label: updatedModelCode
                      }}
                      onChange={(selectedOption) =>
                        setUpdatedModelCode(selectedOption.value)
                      }
                      options={getModelOptions()}
                    />
                  )}
                </>
              ) : (
                <>
                  {car.Manufacturer_Code} {car.model_code}
                </>
              )}
            </h2>
            <p className={styles.carYear}>
              {editMode ? (
                <Select
                  value={{
                    value: updatedYear,
                    label: updatedYear.toString()
                  }}
                  onChange={(selectedOption) =>
                    setUpdatedYear(selectedOption.value)
                  }
                  options={Array.from({ length: 2025 - 1990 }, (_, index) => ({
                    value: 1990 + index,
                    label: (1990 + index).toString(),
                  }))}
                  placeholder="Select Year"
                  className={styles.input}
                />
              ) : (
                `Year: ${car.Year}`
              )}
            </p>
            <div className={styles.carRental}>
              <h3 className={styles.carRentalTitle}>Rental Price (per day)</h3>
              {editMode ? (
                <input
                  type="number"
                  value={updatedRentalPrice}
                  onChange={(e) => setUpdatedRentalPrice(e.target.value)}
                />
              ) : (
                <p>{car.Rental_Price_Per_Day} USD</p>
              )}
            </div>
          </div>
  
          <div className={styles.carFeatures}>
            <ul className={styles.featureList}>
              <li>
                <PersonIcon className={styles.featureIcon} />
                {editMode ? (
                  <Select
                    value={{
                      value: updatedSeatsAmount,
                      label: updatedSeatsAmount.toString()
                    }}
                    onChange={(selectedOption) =>
                      setUpdatedSeatsAmount(selectedOption.value)
                    }
                    options={Array.from({ length: 15 - 2 + 1 }, (_, index) => ({
                      value: 2 + index,
                      label: (2 + index).toString(),
                    }))}
                    placeholder="Select Seats Amount"
                    className={styles.input}
                  />
                ) : (
                  `Seats Amount: ${car.Seats_Amount}`
                )}
              </li>
              <li>
                <TbManualGearbox className={styles.featureIcon} />
                {editMode ? (
                  <Select
                    value={{
                      value: updatedTransmissionType,
                      label: updatedTransmissionType
                    }}
                    onChange={(selectedOption) =>
                      setUpdatedTransmissionType(selectedOption.value)
                    }
                    options={["Manual", "Auto"].map((transmissionOption) => ({
                      value: transmissionOption,
                      label: transmissionOption,
                    }))}
                    placeholder="Select Transmission Type"
                    className={styles.input}
                  />
                ) : (
                  `Transmission Type: ${car.Transmission_type}`
                )}
              </li>
              <li>
                <FaCogs className={styles.featureIcon} />
                {editMode ? (
                  <Select
                    value={{
                      value: updatedEngineType,
                      label: updatedEngineType
                    }}
                    onChange={(selectedOption) =>
                      setUpdatedEngineType(selectedOption.value)
                    }
                    options={["Petrol", "Diesel", "Electric", "Hybrid"].map(
                      (engineOption) => ({
                        value: engineOption,
                        label: engineOption,
                      })
                    )}
                    placeholder="Select Engine Type"
                    className={styles.input}
                  />
                ) : (
                  `Engine Type: ${car.Engine_Type}`
                )}
              </li>
              <li>
                <h3 className={styles.carColorTitle}>Color:</h3>
                {editMode ? (
                  <Select
                    value={{
                      value: updatedColor,
                      label: updatedColor
                    }}
                    onChange={(selectedOption) =>
                      setUpdatedColor(selectedOption.value)
                    }
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
                ) : (
                  `Color: ${car.Color}`
                )}
              </li>
              <li>
                <h3 className={styles.carDescriptionTitle}>Description:</h3>
                {editMode ? (
                  <textarea
                    className={styles.carDescriptionInput}
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                ) : (
                  <p className={styles.carDescriptionText}>{car.Description}</p>
                )}
              </li>
            </ul>
          </div>
        </section>
  
        <section className={styles.carSection}>
          <div className={styles.carInfo}>
            {/* Additional car information */}
          </div>
  
          {editMode && (
            <Button style={btnStyle} onClick={handleSaveClick} name="Save"></Button>
          )}
  
          {car.Renter_Id !== userDetails._id && (
            <Button style={btnStyle} onClick={() => setEditMode(!editMode)} name={editMode ? 'Cancel' : 'Edit'}> </Button>
          )}
        </section>
      </div>
    </div>
  );
}  