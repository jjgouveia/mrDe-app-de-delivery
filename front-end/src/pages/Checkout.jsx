import React from 'react';
import NavBar from '../componentes/navbar';
import OrderProducts from '../componentes/OrderProducts';

const names = ['Isabelly', 'Jadson', 'Japhé'];

const array = [{
  name: 'primeiro item',
  productId: 8,
  quantity: 5,
  subTotal: 10,
  unitPrice: '2',
},
{
  name: 'segundo item',
  productId: 4,
  quantity: 2,
  subTotal: 6,
  unitPrice: '3',
},
{
  name: 'terceiro item',
  productId: 3,
  quantity: 8,
  subTotal: 32,
  unitPrice: '4',
}];

function Checkout() {
  return (
    <div>
      <NavBar />
      <h1>
        Finalizar pedido
      </h1>
      <div>
        { array.map((order) => (<OrderProducts
          product={ order }
          key={ order.productId }
        />))}
      </div>
      <div>
        Total
        { ' ' }
        <div data-testid="customer_checkout__element-order-total-price">
          { array.reduce((acc, curr) => acc + curr.subTotal, 0)}
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
