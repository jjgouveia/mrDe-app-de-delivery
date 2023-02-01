import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import ProductP from '../components/productsP';
import { getAllSales } from '../routes/order.routes';

const user = JSON.parse(localStorage.getItem('user'));

export default function SellerOrders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getAllSales(user?.token)
      .then((data) => {
        setSales(data.filter((order) => order.sellerId === user.id));
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Pedidos</h1>
      <div>
        { sales.length === 0 ? (<p>AINDA NÃO HÁ VENDAS PARA MOSTRAR</p>) : sales
          .map((product, i) => (<ProductP product={ product } key={ i } />))}
      </div>
    </div>
  );
}
