import React from 'react';
import PropTypes from 'prop-types';

function OrderProducts(props) {
  const { product, index } = props;
  const { name, productId, quantity, subTotal, unitPrice } = product;
  const dataTeste = 'customer_checkout__element-order-table-item-number-';
  return (
    <div>
      <div>
        Item
        { ' ' }
        <p
          data-testid={ `${dataTeste}${index}` }
        >
          {productId}

        </p>
      </div>
      <div>
        Descrição
        { ' ' }
        <p data-testid={ `customer_checkout__element-order-table-name-${index}` }>
          {name}

        </p>
      </div>
      <div>
        Quantidade
        { ' ' }
        <p data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
          {quantity}

        </p>
      </div>
      <div>
        Valor Unitário
        { ' ' }
        <p
          data-testid={
            `customer_checkout__element-order-table-unit-price-${index}`
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
            `customer_checkout__element-order-table-sub-total-${index}`
          }
        >
          {subTotal}

        </p>
      </div>
      Remover item
      { ' ' }
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
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
  index: PropTypes.string.isRequired,
};
export default OrderProducts;
