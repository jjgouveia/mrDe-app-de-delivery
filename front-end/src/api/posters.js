const postOrder = (order) => {
  const Order = fetch('http://localhost:3001/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  }).then((response) => response.json());
  return Order;
};

export default postOrder;
