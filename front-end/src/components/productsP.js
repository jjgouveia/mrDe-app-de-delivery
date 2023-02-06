import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/OrderContainer.css';

export default function ProductP(props) {
  const { product, role } = props;
  const { id, status, saleDate, totalPrice } = product;

  return (
    <Link to={ `${id}` }>
      <div className="order-container">
        <div className="order-element order-number">
          <div>Pedido</div>
          <span
            data-testid={ `${role}_orders__element-order-id-${id}` }
          >
            { id }
          </span>
        </div>
        <div
          className={
            `order-element order-status status-color-Em-Trânsito status-color-${status}`
          }
        >
          <p
            data-testid={ `${role}_orders__element-delivery-status-${id}` }
          >
            { status }
          </p>

        </div>
        <div className="data-and-price">
          <div className="order-element order-date">
            <p
              data-testid={ `${role}_orders__element-order-date-${id}` }
            >
              { new Date(saleDate).toLocaleDateString('pt-br') }
            </p>
          </div>

          <div className="order-element order-price">
            R$
            <span
              data-testid={ `${role}_orders__element-card-price--${id}` }
            >
              { totalPrice.replace(/\./, ',') }
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}

ProductP.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
  role: PropTypes.string.isRequired,
};
