import React from 'react';
import PropTypes from 'prop-types';

function OrderProducts(props) {
  const borderSolidBlac = '2px solid black';
  const { product } = props;
  const { id, name, quantity, subTotal, unitPrice } = product;
  return (
    <div style={ { display: 'flex', padding: '10px', textAlign: 'center' } }>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        Item
        { ' ' }
        <p
          data-testid={ `customer_checkout__element-order-table-item-number-${id}` }
        >
          {id + 1}

        </p>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <div>Descrição</div>
        <p data-testid={ `customer_checkout__element-order-table-name-${id}` }>
          {name}
        </p>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        Quantidade
        { ' ' }
        <p data-testid={ `customer_checkout__element-order-table-quantity-${id}` }>
          {quantity}

        </p>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        Valor Unitário
        { ' ' }
        <p
          data-testid={
            `customer_checkout__element-order-table-unit-price-${id}`
          }
        >
          {unitPrice.replace(/\./, ',')}

        </p>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        Sub-total
        { ' ' }
        <p
          data-testid={
            `customer_checkout__element-order-table-sub-total-${id}`
          }
        >
          {subTotal.toFixed(2).toString().replace(/\./, ',')}

        </p>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        Remover item
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${id}` }
          type="submit"
        >
          Remover
        </button>
      </div>

    </div>
  );
}
OrderProducts.propTypes = {
  product: PropTypes
    .objectOf(Object).isRequired,
};
export default OrderProducts;
