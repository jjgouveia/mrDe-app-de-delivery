import React from 'react';
import PropTypes from 'prop-types';

function OrderProducts(props) {
  const { product, updateCheckout } = props;
  const { id, name, productId, quantity, subTotal, unitPrice } = product;
  return (
    <div>
      <div>
        <strong>Item: </strong>
        { ' ' }
        <span
          data-testid={ `customer_checkout__element-order-table-item-number-${id}` }
        >
          {id + 1}

        </span>
      </div>
      <div>
        <strong>Descrição: </strong>
        { ' ' }
        <span data-testid={ `customer_checkout__element-order-table-name-${id}` }>
          {name}
        </span>
      </div>
      <div>
        <strong>Quantidade: </strong>
        { ' ' }
        <span data-testid={ `customer_checkout__element-order-table-quantity-${id}` }>
          {quantity}
        </span>
      </div>
      <div>
        <strong>Valor Unitário: </strong>
        { ' ' }
        <span
          data-testid={
            `customer_checkout__element-order-table-unit-price-${id}`
          }
        >
          {unitPrice.replace(/\./, ',')}
        </span>
      </div>
      <div>
        <strong>Sub-total: </strong>
        { ' ' }
        <span
          data-testid={
            `customer_checkout__element-order-table-sub-total-${id}`
          }
        >
          {subTotal.toFixed(2).toString().replace(/\./, ',')}
        </span>
      </div>
      <strong>Remover item: </strong>
      { ' ' }
      <button
        onClick={ () => {
          const cart = JSON.parse(localStorage.getItem('carrinho'));

          cart.forEach((el) => {
            if (el.productId === productId) {
              el.quantity = 0;
            }
          });

          localStorage.setItem('carrinho', JSON.stringify(cart));
          const v = updateCheckout.aux;
          updateCheckout.setAux(!v);
        } }
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
  updateCheckout: PropTypes
    .objectOf(Object).isRequired,
};
export default OrderProducts;
