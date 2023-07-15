import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomeLayout from "./pages/HomeLayout";
import UserLayout from "./pages/UserLayout";
import { SearchCarListResult } from "./contexts/SearchCarListResult";
import { AllCarsContext } from "./contexts/AllCarsContext";
import { UserProfileDetails } from "./contexts/UserProfileDetails";
import { getAllUserDetails } from "./api/usersApi";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {


  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carList, setCarList] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [userDetails, setUserDetails] = useState("");

  const closeLogin = () => setShowLogin(false);
  const closeRegister = () => setShowRegister(false);
  const updateCarList = (updatedList) => setCarList(updatedList);




  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  useEffect(() => {
    // Fetch all cars from backend API using Axios
    axios
      .get("http://localhost:3001/cars/getallcars")
      .then((response) => {
        console.log(response.data);
        setAllCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);


  // Check if the user is already logged in on initial mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getAllUserDetails(userId)
    .then((res) => {
      setUserDetails(res.data[0]);
    })
    .catch((err) => console.log("Couldnt get user details ", err));
  },[]);

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <>
      <SearchCarListResult.Provider value={{ carList, updateCarList }}>
        <AllCarsContext.Provider value={{ allCars, setAllCars }}>
        <UserProfileDetails.Provider value={{userDetails,setUserDetails}}>
          {isLoggedIn ? (
            <UserLayout setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <HomeLayout openLogin={openLogin} openRegister={openRegister} />
          )}
          {showLogin && (
            <Login handleLogin={handleLogin} onClose={closeLogin} />
          )}
          {showRegister && (
            <Register onClose={closeRegister} openLogin={openLogin} />
          )}
          <Footer/>
          </UserProfileDetails.Provider>
        </AllCarsContext.Provider>
      </SearchCarListResult.Provider>
    </>
  );
}

export default App;
