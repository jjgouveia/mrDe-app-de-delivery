import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import AppContext from '../context/app.context';
import OrdersP from '../components/OrdersP';
import { updateStatusOrderById } from '../routes/order.routes';

function formatDate(date) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', options);
  return formattedDate;
}

export default function OrderDetails() {
  const orderLocalStorage = JSON.parse(localStorage.getItem('data'));
  const user = JSON.parse(localStorage.getItem('user'));
  const { sellers } = useContext(AppContext);

  const [order, setOrder] = useState(orderLocalStorage);

  const { role, token } = user;

  const aux = sellers.find(({ id }) => id === Number(order.sellerId));

  let name = '';

  if (aux) {
    name = aux.name;
  }

  const { id } = useParams();
  const deliveryCheckStatus = order.status !== 'Em Trânsito';
  const dispatchCheckStatus = order.status === 'Pendente';
  const preparingCheckStatus = order.status !== 'Preparando';

  const handleClick = async (status) => {
    await updateStatusOrderById(status, id, token);
    console.log('novo status', order.status);
    order.status = status;
    console.log('nova order', order);
    localStorage.setItem('date', JSON.stringify(order));
    console.log('novo localStorage', JSON.parse(localStorage.getItem('data')));
    setOrder(order);
    console.log('novo estado', order);
  };

  const deliveryCheckButton = (
    <button
      disabled={ deliveryCheckStatus }
      data-testid={ `${user.role}_order_details__button-delivery-check` }
      type="button"
      onClick={ handleClick('Entregue') }
    >
      MARCAR COMO ENTREGUE
    </button>
  );

  const dispatchCheckButton = (
    <button
      disabled={ !dispatchCheckStatus }
      data-testid="seller_order_details__button-dispatch-check"
      type="button"
      onClick={ handleClick('Em Trânsito') }
    >
      Saiu para entrega
    </button>
  );

  const preparingCheckButton = (
    <button
      disabled={ preparingCheckStatus }
      data-testid="seller_order_details__button-preparing-check"
      type="button"
      onClick={ handleClick('Preparando') }
    >
      PREPARAR PEDIDO
    </button>
  );

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

        <span>
          { ' ' }
          Nome:
          { ' ' }
          <span
            data-testid={
              `${role}_order_details__element-order-details-label-seller-name`
            }
          >
            { name }
          </span>
        </span>

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
        <span>
          { ' ' }
          Status:
          { ' ' }
          <span
            data-testid={
              `${role}_order_details__element-order-details-label-delivery-${'status'}`
            }
          >
            { order.status }
            { ' ' }
          </span>
        </span>
        {user.role === 'customer' ? deliveryCheckButton : ''}
        { ' ' }
        {user.role === 'seller' ? dispatchCheckButton : ''}
        { ' ' }
        {user.role === 'seller' ? preparingCheckButton : ''}
        <span>
          { ' ' }
          Total:
          { ' ' }
          <span
            data-testid={ `${user.role}_order_details__element-order-total-price` }
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
