import React from 'react';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';

const names = ['Isabelly', 'Jadson', 'Japhé'];

const array = [
  {
    id: 0,
    name: 'primeiro item',
    productId: 1,
    quantity: 5,
    subTotal: 10,
    unitPrice: '2',
  },
  {
    id: 1,
    name: 'segundo item',
    productId: 2,
    quantity: 2,
    subTotal: 6,
    unitPrice: '3',
  },
  {
    id: 2,
    name: 'terceiro item',
    productId: 3,
    quantity: 8,
    subTotal: 32,
    unitPrice: '4',
  },
  {
    id: 3,
    name: 'quarto item',
    productId: 4,
    quantity: 8,
    subTotal: 40,
    unitPrice: '5',
  },
  {
    id: 4,
    name: 'quinto item',
    productId: 5,
    quantity: 8,
    subTotal: 40,
    unitPrice: '5',
  },
  {
    id: 5,
    name: 'sexto item',
    productId: 6,
    quantity: 2,
    subTotal: 8,
    unitPrice: '4',
  },
  {
    id: 6,
    name: 'sétimo item',
    productId: 7,
    quantity: 3,
    subTotal: 15,
    unitPrice: '5',
  },
];

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
