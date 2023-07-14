import React, { useState} from "react";
import { login } from "../../api/usersApi";
import styles from "./login.module.css";

export default function Login({handleLogin, onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");


  // handle the login submit.
  const handleFormLogin = (e) => {
    e.preventDefault();
    // check if user is already signed in
    const token = localStorage.getItem("token");
    if (token) {
      // User is already signed in, display a message or handle accordingly
      setErrorMessage("error", "You are already signed in");
      return;
    }
    // creating the login object.
    const loginInfo = {
      email: email,
      password: password,
    };
    // sending the login object to the backend and displaying the result .
    login(loginInfo)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        console.log("Successfully logged in");
        handleLogin();
      })
      .catch((err) => {
        console.log("There was an error logging in ");
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
      onClose();
  };

  return (
    <>
    <section className={styles.login}>
      <div className={styles.background}>
        <div className={styles.content}>
          <form>
            <div className={styles.closeButton}>
              <button
                type="button"
                className={styles.closeButtonStyle}
                onClick={onClose}
              >
                X
              </button>
            </div>
            <h2 className={styles.title}>Login</h2>

            <label className={styles.label}>Email</label>
            <input
              type="text"
              name="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className={styles.submitButton}
              onClick={handleFormLogin}
            >
              Login
            </button>
          </form>
          <p className={styles.errorMessage}>{ErrorMessage}</p>
        </div>
      </div>
    </section>
    </>
  );
}
