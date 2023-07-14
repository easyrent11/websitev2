import React from "react";
import carIcon from "../../assets/CarIcon.png";
import { Element } from "react-scroll";
import styles from "./thirdsection.module.css";

export default function ThirdSection() {
  return (
    <>
      <Element id="about" name="about">
        <section
          id="about"
          className={styles.section}>
          <div className={styles.div}>
            <h2 className={styles.h2}>
              About Us
            </h2>
            <p className={styles.p}>
              At <span className={styles.span}>EasyRent</span>, we are
              dedicated to providing a seamless and hassle-free car rental
              experience to our customers. Our website offers a platform for car
              owners to list their cars for rent, and it allows renters to
              easily find and rent cars that meet their needs. Our mission is to
              make car rental easy, convenient, and affordable for everyone. We
              strive to provide exceptional customer service and support.
              Whether you're a car owner looking to earn some extra income, or a
              renter in need of a reliable car,{" "}
              <span className={styles.span}>EasyRent</span> is the ultimate
              car rental solution.
            </p>
          </div>

          <figure className={styles.figure}>
            <img src={carIcon} className={styles.img} alt="Car Icon" />
          </figure>
        </section>
      </Element>
    </>
  );
}
