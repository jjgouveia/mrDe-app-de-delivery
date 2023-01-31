import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import ProductP from '../components/productsP';
import { getAllSales } from '../routes/order.routes';

// const dataMock = [
//   {
//     id: 1,
//     userId: 1,
//     sellerId: 1,
//     totalPrice: 50.99,
//     deliveryAddress: 'Rua Tal',
//     deliveryNumber: '71992693058',
//     saleDate: '08/04/21',
//     status: 'Pendente',
//   },
//   {
//     id: 2,
//     userId: 1,
//     sellerId: 1,
//     totalPrice: 50.99,
//     deliveryAddress: 'Rua Tal',
//     deliveryNumber: '71992693058',
//     saleDate: '08/04/21',
//     status: 'Pendente',
//   },
//   {
//     id: 3,
//     userId: 1,
//     sellerId: 1,
//     totalPrice: 50.99,
//     deliveryAddress: 'Rua Tal',
//     deliveryNumber: '71992693058',
//     saleDate: '08/04/21',
//     status: 'Pendente',
//   },
//   {
//     id: 4,
//     userId: 1,
//     sellerId: 1,
//     totalPrice: 50.99,
//     deliveryAddress: 'Rua Tal',
//     deliveryNumber: '71992693058',
//     saleDate: '08/04/21',
//     status: 'Pendente',
//   },
//   {
//     id: 5,
//     userId: 1,
//     sellerId: 1,
//     totalPrice: 50.99,
//     deliveryAddress: 'Rua Tal',
//     deliveryNumber: '71992693058',
//     saleDate: '08/04/21',
//     status: 'Pendente',
//   },
// ];

const user = JSON.parse(localStorage.getItem('user'));

export default function SellerOrders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getAllSales(user.token)
      .then((data) => {
        console.log('FETCH SALES REQUEST', data);
        setSales(data.filter((order) => order.sellerId === user.id));
      });
  }, []);

  console.log('FETCH SALES', sales);

  return (
    <div>
      <NavBar />
      <h1>Pedidos</h1>
      <div>
        { sales.length === 0 ? (<p>AINDA NÃO HÁ VENDAS PARA MOSTRAR</p>) : sales
          .map((product, i) => (<ProductP product={ product } key={ i } />))}
      </div>
      {/* <div>
        {dataMock.map((product, i) => (<ProductP product={ product } key={ i } />))}
      </div> */}
    </div>
  );
}
