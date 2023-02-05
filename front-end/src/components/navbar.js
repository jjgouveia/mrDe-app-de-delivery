/* eslint-disable import/no-import-module-exports */
import React, { useEffect, useState /* , useRef */ } from 'react';
import { Link, Navigate /* , useLocation */ } from 'react-router-dom';
import logoBranca from '../images/02_branco.png';
import '../css/navbar.css';

function NavBar() {
  const [dataUser, setDataUser] = useState();
  const [redirect, setRedirect] = useState(true);

  // const url = useLocation().pathname.split('/');

  // const productsSelected = useRef();
  // const ordersSelected = useRef();

  useEffect(() => {
    setDataUser(JSON.parse(localStorage.getItem('user')));
    // if (url[2] === 'products') {
    //   productsSelected.current.classList.add('selected');
    // } if (url[2] === 'orders') {
    //   ordersSelected.current.classList.add('selected');
    // }
  }, [] /* , [url] */);

  const content = redirect ? (
    <nav>
      <img className="logo-nav" src={ logoBranca } alt="logo" />
      <div className="links">
        <Link
        // ref={ productsSelected }
          className="branco"
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>

        <Link
        // ref={ ordersSelected }
          className="branco"
          to={ `/${JSON.parse(localStorage.getItem('user')).role}/orders` }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </Link>
      </div>

      <div className="mais">
        <span data-testid="customer_products__element-navbar-user-full-name">
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
  ) : (<Navigate to="/login" />);
  return content;
}
export default NavBar;
