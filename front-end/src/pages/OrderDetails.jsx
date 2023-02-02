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
  const { sellers } = useContext(AppContext);

  const aux = sellers.find(({ id }) => id === Number(order.sellerId));

  let name = '';

  if (aux) {
    name = aux.name;
  }

  const { id } = useParams();
  const disabled = true;
  return (
    <div>
      <NavBar />
      <h2>Detalhes do Pedido</h2>
      <span>
        Pedido:
        { ' ' }
        <span
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { id }
        </span>
      </span>

      <span>
        { ' ' }
        Nome:
        { ' ' }
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { name }
        </span>
      </span>

      <span>
        { ' ' }
        Data:
        { ' ' }
        <span
          data-testid="customer_order_details__element-order-details-label-order-date"
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
            `customer_order_details__element-order-details-label-delivery-${'status'}`
          }
        >
          { order.status }
          { ' ' }
        </span>
      </span>

      <button
        disabled={ disabled }
        data-testid="customer_order_details__button-delivery-check"
        type="button"
      >
        Preparar Pedido
      </button>

      { ' ' }

      <button
        data-testid="customer_order_details__button-dispatch-check"
        type="button"
      >
        Saiu para entrega
      </button>

      <span>
        { ' ' }
        Total:
        { ' ' }
        <span
          data-testid="customer_order_details__element-order-total-price"
        >
          { order.totalPrice.replace('.', ',') }
          { ' ' }
        </span>
      </span>
    </div>
  );
}
