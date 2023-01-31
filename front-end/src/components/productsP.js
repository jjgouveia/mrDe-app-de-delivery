import React from 'react';
import PropTypes from 'prop-types';

export default function ProductP(props) {
  const borderSolidBlac = '2px solid black';
  const { product } = props;
  const { id, status, saleDate, totalPrice } = product;
  return (
    <div style={ { display: 'flex', padding: '10px', textAlign: 'center' } }>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <p>Pedido: </p>
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          { id }
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <p>Status: </p>
        <span
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <p>Data: </p>
        <span
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { saleDate }
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <p>Preço:</p>
        <span
          data-testid={ `customer_orders__element-card-price--${id}` }
        >
          { totalPrice }
        </span>
      </div>
    </div>
  );
}

ProductP.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
};
