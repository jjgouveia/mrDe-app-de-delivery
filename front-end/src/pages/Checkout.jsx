import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';

const names = ['Isabelly', 'Jadson', 'Japhé'];

function Checkout() {
  const c1 = JSON.parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
  const [cart, setCart] = useState(c1.map((cp, i) => ({ id: i, ...cp })));
  const [aux, setAux] = useState(true);

  useEffect(() => {
    const c2 = JSON.parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
    setCart(c2.map((cp, i) => ({ id: i, ...cp })));
  }, [aux]);

  return (
    <div>
      <NavBar />
      <h1>
        Finalizar pedido
      </h1>
      <div>
        { cart.map((order) => (<OrderProducts
          product={ order }
          key={ order.productId }
          updateCheckout={ { setAux, aux } }
        />))}
      </div>
      <div>
        <strong>Total: </strong>
        <span>R$ </span>
        { ' ' }
        <span data-testid="customer_checkout__element-order-total-price">
          { cart.reduce((acc, curr) => acc + curr.subTotal, 0).toFixed(2).toString().replace(/\./, ',')}
        </span>
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
