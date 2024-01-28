import React from "react";
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Место - Россия" className="header__logo-image" />
      </Link>
      
      {loggedIn ? (
        <div className="header__bar">
          <p className="header__login">{userEmail}</p>
          <Link to="/" className="header__unlogin" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <>
          {location.pathname.includes('sign-in') && (
            <Link to="/sign-up" className="header__signin">
              Регистрация
            </Link>
          )}
          {location.pathname.includes('sign-up') && (
            <Link to="/sign-in" className="header__signup">
              Войти
            </Link>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
