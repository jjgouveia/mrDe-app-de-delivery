import React from 'react';
import PropTypes from 'prop-types';

export default function ProductP(props) {
  const { product } = props;
  const { id, status, saleDate, totalPrice } = product;
  return (
    <div>
      <p>Pedido: </p>
      <span
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { id }
      </span>

      <p>Status: </p>
      <span
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </span>

      <p>Data: </p>
      <span
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { saleDate }
      </span>

      <p>Preço:</p>
      <span
        data-testid={ `customer_orders__element-card-price--${id}` }
      >
        { totalPrice }
      </span>
    </div>
  );
}

ProductP.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
};
