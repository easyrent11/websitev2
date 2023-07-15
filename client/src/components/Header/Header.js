import React  from 'react'
import FullScreenNav from '../FullScreenNav/FullScreenNav';
import DropDownNav from '../DropDownNav/DropDownNav';
import classes from './header.module.css';

export default function Header({ openLogin, openRegister }) {



  return (
    <header className={classes.header}>
      <FullScreenNav openLogin={openLogin} openRegister={openRegister} />
      <DropDownNav openLogin={openLogin} openRegister={openRegister} />
    </header>
  );
}





