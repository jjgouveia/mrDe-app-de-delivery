import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductP(props) {
  const borderSolidBlac = '2px solid black';
  const { product, role } = props;
  const { id, status, saleDate, totalPrice } = product;

  return (
    <div style={ { border: borderSolidBlac, padding: '1' } }>
      <Link to={ `${id}` }>
        <div>
          <p>
            Pedido:
            <span
              data-testid={ `${role}_orders__element-order-id-${id}` }
            >
              { id }
            </span>
          </p>
        </div>

        <p>
          Status:
          <span
            data-testid={ `${role}_orders__element-delivery-status-${id}` }
          >
            { status }
          </span>
        </p>

        <p>
          Data:
          <span
            data-testid={ `${role}_orders__element-order-date-${id}` }
          >
            { new Date(saleDate).toLocaleDateString('pt-br') }
          </span>
        </p>

        <p>
          Preço:
          <span
            data-testid={ `${role}_orders__element-card-price--${id}` }
          >
            { totalPrice.replace(/\./, ',') }
          </span>
        </p>
      </Link>
    </div>
  );
}

ProductP.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
  role: PropTypes.string.isRequired,
};
