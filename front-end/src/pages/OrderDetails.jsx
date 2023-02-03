import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import OrdersP from '../components/OrdersP';
import formatDate from '../utils/formatData';
import {
  updateStatusOrderById,
  getOrderByID,
  getproductListBySaleId,
} from '../routes/order.routes';
import { getUsers } from '../routes/user.routes';

export default function OrderDetails() {
  const { id } = useParams();
  const { role, token } = JSON.parse(localStorage.getItem('user'));

  const [order, setOrder] = useState({
    status: 'Pendente',
    totalPrice: '0.00',
    products: [],
    saleDate: '0000-00-00T00:00:00.000Z',
  });

  const [disableButtons, setDisableButtons] = useState({
    deliveryCheckStatus: order.status !== 'Em Trânsito',
    dispatchCheckStatus: order.status !== 'Preparando',
    preparingCheckStatus: order.status !== 'Pendente',
  });

  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getUsers();
      const orderById = await getOrderByID(id, token);
      const productListBySaleId = await getproductListBySaleId(id, token);
      console.log('productListBySaleId ', productListBySaleId);
      setOrder({
        status: orderById.status,
        totalPrice: orderById.totalPrice,
        products: productListBySaleId,
        saleDate: orderById.saleDate,
        name: allUsers.find((u) => u.id === orderById.sellerId).name,

      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDisableButtons({
      deliveryCheckStatus: order.status !== 'Em Trânsito',
      dispatchCheckStatus: order.status !== 'Preparando',
      preparingCheckStatus: order.status !== 'Pendente',
    });
  }, [order.status]);

  const handleClick = async (status) => {
    await updateStatusOrderById({ status }, id, token);

    const orderById = await getOrderByID(id, token);

    setOrder({
      ...order,
      status: orderById.status,
    });
  };

  const {
    deliveryCheckStatus,
    dispatchCheckStatus,
    preparingCheckStatus,
  } = disableButtons;

  const deliveryCheckButton = (
    <button
      disabled={ deliveryCheckStatus }
      data-testid="customer_order_details__button-delivery-check"
      type="button"
      onClick={ async () => { handleClick('Entregue'); } }
    >
      MARCAR COMO ENTREGUE
    </button>
  );

  const dispatchCheckButton = (
    <button
      disabled={ dispatchCheckStatus }
      data-testid="seller_order_details__button-dispatch-check"
      type="button"
      onClick={ async () => { handleClick('transito'); } }
    >
      Saiu para entrega
    </button>
  );

  const preparingCheckButton = (
    <button
      disabled={ preparingCheckStatus }
      data-testid="seller_order_details__button-preparing-check"
      type="button"
      onClick={ async () => { handleClick('Preparando'); } }
    >
      PREPARAR PEDIDO
    </button>
  );

  const sellerName = (
    <span>
      P. Vend:
      <span
        data-testid={
          `${role}_order_details__element-order-details-label-seller-name`
        }
      >
        { order.name }
      </span>
    </span>
  );

  console.log('OORDEER', order);

  const statusDataTestId = role === 'customer'
    ? `${role}_order_details__element-order-details-label-delivery-status-${id}`
    : `${role}_order_details__element-order-details-label-delivery-status`;

  return (
    <div>
      <NavBar />
      <h2>Detalhes do Pedido</h2>
      <div>
        <span>
          Pedido:
          { ' ' }
          <span
            data-testid={
              `${role}_order_details__element-order-details-label-order-id`
            }
          >
            { id }
          </span>
        </span>
        {role === 'customer' ? sellerName : ''}
        <span>
          { ' ' }
          Data:
          { ' ' }
          <span
            data-testid={
              `${role}_order_details__element-order-details-label-order-date`
            }
          >
            { formatDate(new Date(order.saleDate)) }
          </span>
        </span>

        <span data-testid={ statusDataTestId }>{ order.status }</span>

        {role === 'customer' ? deliveryCheckButton : ''}
        { ' ' }
        {role === 'seller' ? dispatchCheckButton : ''}
        { ' ' }
        {role === 'seller' ? preparingCheckButton : ''}
        <span>
          { ' ' }
          Total:
          { ' ' }
          <span
            data-testid={ `${role}_order_details__element-order-total-price` }
          >
            { order.totalPrice.replace('.', ',') }
            { ' ' }
          </span>
        </span>
      </div>
      <div>
        { order.products.map((el, i) => (
          <OrdersP key={ i } product={ el } index={ i } />
        ))}
      </div>
    </div>
  );
}
