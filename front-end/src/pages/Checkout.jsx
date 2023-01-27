import React from 'react';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';

const names = ['Isabelly', 'Jadson', 'Japhé'];

function Checkout() {
  const carProducts = JSON
    .parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
  const carProductsWithId = carProducts.map((cp, i) => ({ id: i, ...cp }));
  console.log(carProductsWithId);
  return (
    <div>
      <NavBar />
      <h1>
        Finalizar pedido
      </h1>
      <div>
        { carProductsWithId.map((order) => (<OrderProducts
          product={ order }
          key={ order.productId }
        />))}
      </div>
      <div>
        Total
        { ' ' }
        <div data-testid="customer_checkout__element-order-total-price">
          { carProductsWithId.reduce((acc, curr) => acc + curr.subTotal, 0).toFixed(2).toString().replace(/\./, ',')}
        </div>
      </div>
      <div>
        <h1>
          Detalhes de Endereço para Entrega
        </h1>
        <div>
          <p>
            P. Vendedora Responsável:
          </p>
          <select
            data-testid="customer_checkout__select-seller"
            name="select"
          >
            { names.map((name, index) => (<option key={ index }>{name}</option>))}
          </select>
        </div>
        <div>
          <p>
            Endereço
          </p>
          <input
            data-testid="customer_checkout__input-address"
            type="text"
          />
        </div>
        <div>
          <p>
            Número
          </p>
          <input
            data-testid="customer_checkout__input-address-number"
            type="text"
          />
        </div>
        <div>
          <button
            data-testid="customer_checkout__button-submit-order"
            type="submit"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
