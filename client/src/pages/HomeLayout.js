import React from 'react'
import FirstSection from '../components/FirstSection/FirstSection';
import ThirdSection from '../components/ThirdSection/ThirdSection';
import Header from '../components/Header/Header';
import classes from './homelayout.module.css';

export default function HomeLayout({openLogin, openRegister}) {
  return (
    <>
       <main className={classes.main}>
        <Header openLogin={openLogin} openRegister={openRegister}/>
        <FirstSection/>
        <ThirdSection/>
       </main>
    </>
  )
}
