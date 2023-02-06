/* eslint-disable import/no-import-module-exports */
import React, { useEffect, useState, useRef } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import logoBranca from '../images/02_branco.png';
import iconUsuario from '../images/usuario.png';
import '../css/navbar.css';

// const segsAnimation = 0.3;

// function animateLink() {
//   const links = document.querySelectorAll('.link');
//   links.forEach((link, index) => {
//     link.style.animation = link.style.animation
//       ? ''
//       : `navFade 0.5s ease forwards ${(index / 2) * segsAnimation}s`;
//   });
// }

function handleClick() {
  const nav = document.querySelector('#nav');
  const sam = document.querySelector('.sanduba');
  nav.classList.toggle('active');
  sam.classList.toggle('active');
  // animateLink();
}

function NavBar() {
  const [dataUser, setDataUser] = useState();
  const [redirect, setRedirect] = useState(true);
  const [url, setUrl] = useState(useLocation().pathname.split('/'));

  if (!url) {
    setUrl(null);
  }

  const productsSelected = useRef();
  const ordersSelected = useRef();

  useEffect(() => {
    setDataUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    if (url[2] === 'products') {
      productsSelected.current.classList.add('selected');
    } if (url[2] === 'orders') {
      ordersSelected.current.classList.add('selected');
    }
  }, [url]);

  const content = redirect ? (
    <header className="header">
      <img className="logo-nav" src={ logoBranca } alt="logo" />
      <nav id="nav" className="nav">
        <div className="links">
          <Link
            ref={ productsSelected }
            className="branco link"
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>

          <Link
            ref={ ordersSelected }
            className="branco link"
            to={ `/${JSON.parse(localStorage.getItem('user')).role}/orders` }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </div>

        <div className="mais">
          <span data-testid="customer_products__element-navbar-user-full-name">
            <img src={ iconUsuario } alt="eu" />
            { dataUser?.name }
          </span>

          <button
            onClick={ () => {
              localStorage.removeItem('user');
              setRedirect(false);
            } }
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
          >
            Logout
          </button>
        </div>
      </nav>
      <button
        type="button"
        onClick={ handleClick }
        className="sanduba"
      >
        <div className="line1"> </div>
        <div className="line2"> </div>
        <div className="line3"> </div>
      </button>
    </header>
  ) : (<Navigate to="/login" />);
  return content;
}
export default NavBar;
