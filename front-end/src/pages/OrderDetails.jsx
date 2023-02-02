import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import AppContext from '../context/app.context';

// const order2 = JSON.parse(localStorage.getItem('data'));

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
  const order = JSON.parse(localStorage.getItem('data'));
  const user = JSON.parse(localStorage.getItem('user'));
  const { sellers } = useContext(AppContext);

  const aux = sellers.find(({ id }) => id === Number(order.sellerId));

  let name = '';

  if (aux) {
    name = aux.name;
  }

  const { id } = useParams();
  const disabled = true;

  const deliveryCheckButton = (
    <button
      disabled={ disabled }
      data-testid={ `${user.role}_order_details__button-delivery-check` }
      type="button"
    >
      MARCAR COMO ENTREGUE
    </button>
  );

  const dispatchCheckButton = (
    <button
      disabled={ disabled }
      data-testid="seller_order_details__button-dispatch-check"
      type="button"
    >
      Saiu para entrega
    </button>
  );

  const preparingCheckButton = (
    <button
      data-testid="seller_order_details__button-preparing-check"
      type="button"
    >
      PREPARAR PEDIDO
    </button>
  );

  return (
    <div>
      <NavBar />
      <h2>Detalhes do Pedido</h2>
      <span>
        Pedido:
        { ' ' }
        <span
          data-testid={
            `${user.role}_order_details__element-order-details-label-order-id`
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
            `${user.role}_order_details__element-order-details-label-seller-name`
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
            `${user.role}_order_details__element-order-details-label-order-date`
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
            `${user.role}_order_details__element-order-details-label-delivery-${'status'}`
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
  );
}
