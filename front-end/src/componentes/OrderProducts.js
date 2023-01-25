import React from 'react';
import PropTypes from 'prop-types';

function OrderProducts(props) {
  const { product } = props;
  const { name, productId, quantity, subTotal, unitPrice } = product;
  return (
    <div>
      <div>
        Item
        { ' ' }
        <p
          data-testid={ `customer_checkout__element-order-table-item-number-
          ${productId}` }
        >
          {productId}

        </p>
      </div>
      <div>
        Descrição
        { ' ' }
        <p data-testid={ `customer_checkout__element-order-table-name-${productId}` }>
          {name}

        </p>
      </div>
      <div>
        Quantidade
        { ' ' }
        <p data-testid={ `customer_checkout__element-order-table-quantity-${productId}` }>
          {quantity}

        </p>
      </div>
      <div>
        Valor Unitário
        { ' ' }
        <p
          data-testid={ `customer_checkout__element-order-table-unit-price-
        ${productId}` }
        >
          {unitPrice}

        </p>
      </div>
      <div>
        Sub-total
        { ' ' }
        <p
          data-testid={ `customer_checkout__element-order-table-sub-total-
        ${productId}` }
        >
          {subTotal}

        </p>
      </div>
      Remover item
      { ' ' }
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${productId}` }
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
