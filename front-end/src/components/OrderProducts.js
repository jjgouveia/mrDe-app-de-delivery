import React from 'react';
import PropTypes from 'prop-types';

function OrderProducts(props) {
  const borderSolidBlac = '2px solid black';
  const { product, updateCheckout } = props;
  const { id, name, productId, quantity, subTotal, unitPrice } = product;
  return (
    <div style={ { display: 'flex', padding: '10px', textAlign: 'center' } }>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Item: </strong>
        { ' ' }
        <span
          data-testid={ `customer_checkout__element-order-table-item-number-${id}` }
        >
          {id + 1}

        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Descrição: </strong>
        { ' ' }
        <span data-testid={ `customer_checkout__element-order-table-name-${id}` }>
          {name}
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Quantidade: </strong>
        { ' ' }
        <span data-testid={ `customer_checkout__element-order-table-quantity-${id}` }>
          {quantity}
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
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
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
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
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
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
