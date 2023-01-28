import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';
import postOrder from '../api/posters';

const mockOrder = {
  userId: 1,
  sellerId: 1,
  totalPrice: 2.0,
  deliveryAddress: 'Rua 2',
  deliveryNumber: '05/05/2005',
  saleDate: '2005-05-05',
  status: 'Pendente',
};

function OrderDetails() {
  const [order, setOrder] = useState({});

  useEffect(() => {
    postOrder(mockOrder)
      .then((data) => setOrder(data));
  }, []);

  console.log(order);

  const carProducts = JSON
    .parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
  const carProductsWithId = carProducts.map((cp, i) => ({ id: i, ...cp }));
  return (
    <div>
      <NavBar />
      <h1>
        Detalhe do Pedido
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
        <div data-testid="customer_order_details__element-order-total-price">
          { carProductsWithId.reduce((acc, curr) => acc + curr.subTotal, 0).toFixed(2).toString().replace(/\./, ',')}
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;
