import React from "react";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FiMapPin, FiPhone } from "react-icons/fi";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <article className={styles.article}>
        {/* About Us */}
        <div className={styles.about}>
          <h4 className={styles.title}>About Us</h4>
          <p>
            EasyRent is a car rental website that provides a seamless and
            hassle-free experience to our customers. We offer a platform for car
            owners to list their cars for rent, allowing renters to easily find
            and book cars that meet their needs.
          </p>
          <h2 className={styles.companyName}>
            EasyRent
          </h2>
        </div>

        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <h4 className={styles.title}>Contact Info</h4>
          <p className={styles.p}>
            <FiMapPin className={styles.icon} />Street Address: 123 EasyRent St, Haifa, Israel
          </p>
          <p className={styles.p}>
            <FiPhone className={styles.icon}/> Phone: 123-456-7890
          </p>
        </div>
        {/* Navigate */}
        <div className={styles.navigate}>
          <h2 className={styles.title}>Navigate</h2>
          <a className={styles.link} href="#about">About</a>
        </div>
      </article>

      {/* Social Media Icons */}
      <div className={styles.socialMediaIcons}>
        <a href="https://www.facebook.com">
          <FaFacebook className={styles.icon}/>
        </a>
        <a href="https://www.instagram.com">
          <FaInstagram className={styles.icon} />
        </a>
        <a href="https://github.com/easyrent11">
          <FaGithub className={styles.icon} />
        </a>
      </div>

      <div>
        <span>
          © Copyright 2023, All rights reserved.
        </span>
      </div>
    </footer>
  );
}
