/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  const dataUser = JSON.parse(localStorage.getItem('user')) || {
    name: 'Débora',
    email: 'email@dominio.com',
    role: 'customer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  };

  return (
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
        { dataUser.name }
      </span>

      <button
        onClick={ () => { localStorage.removeItem('user'); } }
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Logout
      </button>
    </nav>
  );
}
export default NavBar;
