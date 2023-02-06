import React from 'react';
import PropTypes from 'prop-types';
import '../css/OrderProducts.css';

function OrderProducts(props) {
  const { product, updateCheckout } = props;
  const { id, name, productId, quantity, subTotal, unitPrice } = product;
  return (
    <div className="card-order">
      <div className="elem-order color-purple">
        <span
          data-testid={ `customer_checkout__element-order-table-item-number-${id}` }
        >
          {id + 1}

        </span>
      </div>
      <div className="elem-order diferente aux">
        <span data-testid={ `customer_checkout__element-order-table-name-${id}` }>
          {name}
        </span>
      </div>
      <div className="elem-order roxo-fraco">
        <span data-testid={ `customer_checkout__element-order-table-quantity-${id}` }>
          {quantity}
        </span>
      </div>
      <div className="elem-order sem-radius">
        <span>
          R$
        </span>
        <span
          data-testid={
            `customer_checkout__element-order-table-unit-price-${id}`
          }
        >
          {unitPrice.replace(/\./, ',')}
        </span>
      </div>
      <div className="elem-order roxo-fraco">
        <span>
          R$
        </span>
        <span
          data-testid={
            `customer_checkout__element-order-table-sub-total-${id}`
          }
        >
          {subTotal.toFixed(2).toString().replace(/\./, ',')}
        </span>
      </div>
      <button
        className="elem-order radius-direito"
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
        x
      </button>
    </div>
  );
}
OrderProducts.propTypes = {
  product: PropTypes
    .objectOf(Object).isRequired,
  updateCheckout: PropTypes
    .objectOf(Object),
};

OrderProducts.defaultProps = {
  updateCheckout: { aux: true, setAux: () => {} },
};

export default OrderProducts;
