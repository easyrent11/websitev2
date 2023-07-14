import React from 'react'
import FirstSection from '../components/FirstSection/FirstSection';
import ThirdSection from '../components/ThirdSection/ThirdSection';
import Header from '../components/Header/Header';
export default function HomeLayout({openLogin, openRegister}) {
  return (
    <>
       <Header openLogin={openLogin} openRegister={openRegister}/>
       <FirstSection/>
       <ThirdSection/>
    </>
  )
}
