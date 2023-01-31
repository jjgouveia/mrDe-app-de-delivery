import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../components/navbar';
import ProductP from '../components/productsP';
import { getOrdersByUserId } from '../routes/order.routes';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const getOrders = useCallback(async () => {
    const { data } = await getOrdersByUserId(user?.id, user?.token);
    setOrders(data);
  }, [user?.id, user?.token]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <NavBar />
      <h1>Pedidos</h1>
      <div>
        { !orders || !orders.length
          ? <h2>Carregando a lista</h2>
          : orders.map((product, i) => (<ProductP product={ product } key={ i } />))}
      </div>
    </div>
  );
}
