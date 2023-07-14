import React from 'react';
import styles from "./maintitle.module.css";

export default function MainTitle() {
  return (
    <article className={styles.article}>
        <h1 className={styles.h1}> Drive your dreams... </h1>
        <h1 className={styles.h1}>Rent the perfect</h1> 
        <h1 className={styles.h1}>car for your next</h1> 
        <h1 className={styles.h1}>Advanture</h1>
    </article>
  );
}