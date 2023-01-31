import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductP(props) {
  const { product } = props;
  const { id, status, saleDate, totalPrice } = product;
  return (
    <div style={ { border: '1px solid red', padding: '1' } }>
      <Link to={ `${id}` }>
        <div>
          <p>
            Pedido:
            <span
              data-testid={ `customer_orders__element-order-id-${id}` }
            >
              { id }
            </span>
          </p>
        </div>

        <p>
          Status:
          <span
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            { status }
          </span>
        </p>

        <p>
          Data:
          <span
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            { saleDate }
          </span>
        </p>

        <p>
          Preço:
          <span
            data-testid={ `customer_orders__element-card-price--${id}` }
          >
            { totalPrice }
          </span>
        </p>
      </Link>
    </div>
  );
}

ProductP.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
};
