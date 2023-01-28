/* eslint-disable import/no-import-module-exports */
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  const [dataUser, setDataUser] = useState();
  const [redirect, setRedirect] = useState(true);

  useEffect(() => {
    setDataUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const content = redirect ? (
    <nav>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>

      <Link
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos
      </Link>
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
    </nav>
  ) : (<Navigate to="/login" />);
  return content;
}
export default NavBar;
