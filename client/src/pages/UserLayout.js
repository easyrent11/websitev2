import React from 'react'
import styles from "./userlayout.module.css";
import UserHeader from '../components/UserHeader/UserHeader';
export default function UserLayout() {
  return (
    <>
      <UserHeader/>
      <main className={styles.main}>Hello world</main>
    </>
  );
}
