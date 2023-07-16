import React, { useState} from "react";
import { login } from "../../api/usersApi";
import styles from "./login.module.css";
import Button from '../Button/Button';

export default function Login({handleLogin, onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  // styling for the login button and close button.

  const closeButtonStyle = {
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      padding: '0.5rem',
      borderRadius: '5px',
      width: '10%',
      cursor: 'pointer'
  }
  const loginButtonStyle = {

    backgroundColor: '#cc6200',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '0.25rem',
    width: '50%',
    margin: '1rem auto',
    fontSize: '1.3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }

  // handle the login submit.
  const handleFormLogin = (e) => {
    e.preventDefault();
    // check if user is already signed in
    const token = localStorage.getItem("token");
    if (token) {
      // User is already signed in, display a message or handle accordingly
      setErrorMessage("error", "You are already signed in");
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
        setErrorMessage("Successfully logged in");
        handleLogin();
        onClose();

      })
      .catch(() => {
        setErrorMessage("Wrong email or password please try again..");
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
      
  };

  return (
    <>
    <section className={styles.login}>
      <div className={styles.background}>
        <div className={styles.content}>
          <form>
            <div className={styles.closeButton}>
              <Button
                name="X"
                type="button"
                style={closeButtonStyle}
                onClick={onClose}
              />
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

            <Button
              type="submit"
              name="Login"
              style={loginButtonStyle}
              onClick={handleFormLogin}
            />
          </form>
          <p className={styles.errorMessage}>{ErrorMessage}</p>
        </div>
      </div>
    </section>
    </>
  );
}
