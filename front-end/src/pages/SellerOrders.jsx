import React from 'react';
import NavBar from '../components/navbar';
import ProductP from '../components/productsP';

const dataMock = [
  {
    id: 1,
    userId: 1,
    sellerId: 1,
    totalPrice: 50.99,
    deliveryAddress: 'Rua Tal',
    deliveryNumber: '71992693058',
    saleDate: '08/04/21',
    status: 'Pendente',
  },
  {
    id: 2,
    userId: 1,
    sellerId: 1,
    totalPrice: 50.99,
    deliveryAddress: 'Rua Tal',
    deliveryNumber: '71992693058',
    saleDate: '08/04/21',
    status: 'Pendente',
  },
  {
    id: 3,
    userId: 1,
    sellerId: 1,
    totalPrice: 50.99,
    deliveryAddress: 'Rua Tal',
    deliveryNumber: '71992693058',
    saleDate: '08/04/21',
    status: 'Pendente',
  },
  {
    id: 4,
    userId: 1,
    sellerId: 1,
    totalPrice: 50.99,
    deliveryAddress: 'Rua Tal',
    deliveryNumber: '71992693058',
    saleDate: '08/04/21',
    status: 'Pendente',
  },
  {
    id: 5,
    userId: 1,
    sellerId: 1,
    totalPrice: 50.99,
    deliveryAddress: 'Rua Tal',
    deliveryNumber: '71992693058',
    saleDate: '08/04/21',
    status: 'Pendente',
  },
];

export default function SellerOrders() {
  return (
    <div>
      <NavBar />
      <h1>Pedidos</h1>
      <div>
        { dataMock.map((product, i) => (<ProductP product={ product } key={ i } />))}
      </div>
    </div>
  );
}
