import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';
import { requestOrder } from '../routes/order.routes';

const STATUS_CREATED = 201;

const names = ['Isabelly', 'Jadson', 'Japhé'];

const mockOrder = {
  userId: 1,
  sellerId: 1,
  totalPrice: 2.0,
  deliveryAddress: 'Rua 2',
  deliveryNumber: '05/05/2005',
  saleDate: new Date().getDate(),
  status: 'Pendente',
};

function Checkout() {
  const redirect = useNavigate();

  const [order, setOrder] = useState({});

  console.log(order);

  const user = JSON.parse(localStorage.getItem('user'));

  async function submitOrder() {
    const request = await requestOrder(mockOrder, user?.token);
    if (request.status === STATUS_CREATED) {
      setOrder(request.data);
      redirect(`/customer/orders/${request.data.id}`);
    }
  }

  const carProducts = JSON
    .parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
  const carProductsWithId = carProducts.map((cp, i) => ({ id: i, ...cp }));

  return (
    <div>
      <NavBar />
      <h1>
        Finalizar pedido
      </h1>
      <div>
        { carProductsWithId.map((product) => (<OrderProducts
          product={ product }
          key={ product.productId }
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
            onClick={ submitOrder }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
