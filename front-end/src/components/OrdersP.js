import React from 'react';
import PropTypes from 'prop-types';

export default function OrdersP(props) {
  const borderSolidBlac = '2px solid black';
  const { product, index } = props;
  const { name, quantity, unitPrice, subTotal } = product;

  return (
    <div style={ { border: borderSolidBlac, padding: '1' } }>
      <div>
        <p>
          Item:
          <span
            data-testid={
              `customer_order_details__element-order-table-item-number-${index}`
            }
          >
            { index + 1 }
          </span>
        </p>
      </div>

      <p>
        Descrição:
        <span
          data-testid={ `customer_order_details__element-order-table-name-${index}` }
        >
          { name }
        </span>
      </p>

      <p>
        Quantidade:
        <span
          data-testid={
            `customer_order_details__element-order-table-quantity-${index}`
          }
        >
          {/* { new Date(saleDate).toLocaleDateString('pt-br') } */}
          { quantity }
        </span>
      </p>

      <p>
        Valor Unitário:
        <span
          data-testid={
            `customer_order_details__element-order-table-unit-price-${index}`
          }
        >
          { unitPrice.replace(/\./, ',') }
        </span>
      </p>

      <p>
        Sub-total:
        <span
          data-testid={
            `customer_order_details__element-order-table-unit-price-${index}`
          }
        >
          { String(subTotal.toFixed(2)).replace(/\./, ',') }
        </span>
      </p>
    </div>
  );
}

OrdersP.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};
