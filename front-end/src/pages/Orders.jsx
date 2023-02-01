import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../components/navbar';
import ProductP from '../components/productsP';
import { getOrdersByUserId, getOrdersBySellerId } from '../routes/order.routes';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('customer');

  const user = JSON.parse(localStorage.getItem('user'));

  const getOrders = useCallback(async () => {
    if (user?.role === 'customer') {
      const { data } = await getOrdersByUserId(user?.id, user?.token);
      setOrders(data);
      setRole('customer');
    } else {
      const { data } = await getOrdersBySellerId(user?.id, user?.token);
      setOrders(data);
      setRole('seller');
    }
  }, [user?.id, user?.role, user?.token]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <NavBar />
      <h1>Pedidos</h1>
      <div>
        { orders?.map(
          (product, i) => (<ProductP product={ product } key={ i } role={ role } />),
        )}
      </div>
    </div>
  );
}
