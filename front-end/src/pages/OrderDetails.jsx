// import React, { useContext } from 'react';
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import AppContext from '../context/app.context';
import OrdersP from '../components/OrdersP';
import { updateStatusOrderById, getOrderByID } from '../routes/order.routes';

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
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const { role, token } = user;

  const orderLocalStorage = JSON.parse(localStorage.getItem('data'));

  const [order, setOrder] = useState(orderLocalStorage);

  const [disableButtons, setDisableButtons] = useState({
    deliveryCheckStatus: order.status !== 'Em Trânsito',
    dispatchCheckStatus: order.status !== 'Preparando',
    preparingCheckStatus: order.status !== 'Pendente',
  });

  useEffect(() => {
    const fetchData = async () => {
      const orderById = await getOrderByID(id, token);
      localStorage.setItem('data', JSON.stringify({
        ...orderLocalStorage, status: orderById.status,
      }));

      // setDisableButtons({
      //   deliveryCheckStatus: order.status === 'Em Trânsito',
      //   dispatchCheckStatus: order.status !== 'Preparando',
      //   preparingCheckStatus: order.status !== 'Pendente',
      // });

      // setOrder({
      //   ...orderLocalStorage, status: orderById.status,
      // });
      // const orderLocalStorage = JSON.parse(localStorage.getItem('data'));
      // setOrder(JSON.parse(localStorage.getItem('data')));
    };
    fetchData();
  }, [id, token, orderLocalStorage]);

  /// //////////////////////////////////////////////////////////////////////////////////

  const { sellers } = useContext(AppContext);
  const sellerName = sellers.find((seller) => seller.id === Number(order.sellerId));
  let name = '';
  if (sellerName) {
    name = sellerName.name;
  }

  /// //////////////////////////////////////////////////////////////////////////////////

  const handleClick = async (status) => {
    await updateStatusOrderById({ status }, id, token);

    const orderById = await getOrderByID(id, token);

    localStorage.setItem('data', JSON.stringify({ ...order, status: orderById.status }));
    // console.log('novo localStorage', JSON.parse(localStorage.getItem('data')));
    setOrder({
      ...order, status: orderById.status,
    });
    setDisableButtons({
      deliveryCheckStatus: order.status === 'Em Trânsito',
      dispatchCheckStatus: order.status !== 'Preparando',
      preparingCheckStatus: order.status !== 'Pendente',
    });
    // console.log('novo estado', order);
  };

  const {
    deliveryCheckStatus,
    dispatchCheckStatus,
    preparingCheckStatus,
  } = disableButtons;

  // console.log('STATUS PARA O BOTÃO', order.status);
  // console.log('BOTÃO', deliveryCheckStatus);

  const deliveryCheckButton = (
    <button
      disabled={ deliveryCheckStatus }
      data-testid={ `${user.role}_order_details__button-delivery-check` }
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
              `${role}_order_details__element-order-details-label-delivery-status`
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
      <div>
        <button
          type="button"
          onClick={ () => {
            const resetedLocalStorage = {
              ...order,
              status: 'Pendente',
            };
            // console.log(resetedLocalStorage);
            localStorage.setItem('data', JSON.stringify(resetedLocalStorage));
          } }
        >
          RESETAR LOCALSTORAGE
        </button>
      </div>
    </div>
  );
}
