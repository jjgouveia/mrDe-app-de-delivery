import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';
import postOrder from '../api/posters';

const names = ['Isabelly', 'Jadson', 'Japhé'];

const mockOrder = {
  userId: 1,
  sellerId: 1,
  totalPrice: 2.0,
  deliveryAddress: 'Rua 2',
  deliveryNumber: '05/05/2005',
  saleDate: '2005-05-05',
  status: 'Pendente',
};

function Checkout() {
  const [order, setOrder] = useState({});

  useEffect(() => {
    postOrder(mockOrder)
      .then((data) => setOrder(data));
  }, []);

  const navigate = useNavigate();
  function redirectToOrderDetails() {
    console.log(order);
    navigate(`/customer/orders/${order.id}`);
    // navigate('/customer/orders/1');
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
            onClick={ redirectToOrderDetails }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
