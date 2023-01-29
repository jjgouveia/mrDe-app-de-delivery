import axiosInstance from '../routes/axios';

const NOT_FOUND = 404;

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

const emailUser = async (email, token) => {
  try {
    console.log(`email: ${email}`);
    const t = await axiosInstance.post('/user/find', JSON.parse(email), {
      headers: { Authorization: token },
    });

    return t;
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = (email, token) => {
  const user = fetch('http://localhost:3001/user/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.parse(email),
  }).then((response) => {
    if (response.status === NOT_FOUND) {
      return response.status;
    }
    return response.json();
  });
  return user;
};

export {
  postOrder,
  getUserByEmail,
  emailUser,
};
