import React from 'react';
import PropTypes from 'prop-types';

function OrderProducts(props) {
  const { product } = props;
  const { id, name, productId, quantity, subTotal, unitPrice } = product;
  return (
    <div>
      <div>
        Item
        { ' ' }
        <p
          data-testid={ `customer_checkout__element-order-table-item-number-${id}` }
        >
          {productId}

        </p>
      </div>
      <div>
        Descrição
        { ' ' }
        <p data-testid={ `customer_checkout__element-order-table-name-${id}` }>
          {name}

        </p>
      </div>
      <div>
        Quantidade
        { ' ' }
        <p data-testid={ `customer_checkout__element-order-table-quantity-${id}` }>
          {quantity}

        </p>
      </div>
      <div>
        Valor Unitário
        { ' ' }
        <p
          data-testid={
            `customer_checkout__element-order-table-unit-price-${id}`
          }
        >
          {unitPrice}

        </p>
      </div>
      <div>
        Sub-total
        { ' ' }
        <p
          data-testid={
            `customer_checkout__element-order-table-sub-total-${id}`
          }
        >
          {subTotal}

        </p>
      </div>
      Remover item
      { ' ' }
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${id}` }
        type="submit"
      >
        Remover
      </button>
    </div>
  );
}
OrderProducts.propTypes = {
  product: PropTypes
    .objectOf(Object).isRequired,
};
export default OrderProducts;
