import React  from 'react'
import Logo from "../Logo/Logo"
import classes from './header.module.css';
import Button from '../Button/Button';

export default function Header({ openLogin, openRegister }) {


  const btnStyle1 = {
    margin:'1rem',
    borderRadius:'5px',
    border:'none',
    width:'10%',
    cursor:'pointer',
    padding:'0.5rem'
  }

  const btnStyle2 = {
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
          <a className={classes.a} href='/'>
            Home
          </a>
            <a
              className={classes.a}
              href='#about'
            > About 
            </a>
          <a className={classes.a} href='#'>
            Contact
          </a>
        </div>
        <div className={classes.register_login_div}>
          <Button name="login" style={btnStyle1} onClick={openLogin}>
            Login
          </Button>
          <Button name="register" style={btnStyle2} onClick={openRegister}>
            Register
          </Button>
        </div>
      </nav>
    </header>
  )
}





