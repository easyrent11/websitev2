import React from 'react'
import Logo from "../Logo/Logo"
import classes from './userheader.module.css';
import Button from '../Button/Button';

export default function Header({ openLogin, openRegister }) {
  
  const logout = () => {
    console.log("Logged out");
  }

  const btnLogoutStyle = {
    backgroundColor:'black',
    color:'white',
    margin:'1rem',
    padding:'0.5rem',
    border:'none',
    width:'10%',
    cursor:'pointer',
    borderRadius:'5px'
  }
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.local_links}>
          <Logo/>
          <Button name="Home" className={classes.navBtns}></Button>
          <Button name="Add Car" className={classes.navBtns}></Button>
        </div>
        <div className={classes.logout}>
          <Button name="Logout" style={btnLogoutStyle} onClick={logout}></Button>
        </div>
      </nav>
    </header>
  )
}

