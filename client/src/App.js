import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import HomeLayout from "./pages/HomeLayout";
import UserLayout from "./pages/UserLayout";
import UserHeader from "./components/UserHeader/UserHeader";
import { SearchCarListResult } from "./contexts/SearchCarListResult";
import { AllCarsContext } from "./contexts/AllCarsContext";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carList, setCarList] = useState([]);
  const [allCars, setAllCars] = useState([]);

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

  // Check if the user is already logged in on initial mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <>
      <SearchCarListResult.Provider value={{ carList, updateCarList }}>
        <AllCarsContext.Provider value={{ allCars, setAllCars }}>
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
        </AllCarsContext.Provider>
      </SearchCarListResult.Provider>
    </>
  );
}

export default App;
