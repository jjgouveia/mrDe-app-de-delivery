import axiosInstance from './axios';

export const requestOrder = async (body, token) => {
  try {
    const request = await axiosInstance.post('/sales', body, {
      headers: { Authorization: token },
    });

    return request;
  } catch (err) {
    return { error: err.response };
  }
};

export const getAllSales = async (token) => {
  try {
    const request = await axiosInstance.get('/sales', {
      headers: { Authorization: token },
    });

    return request.data;
  } catch (err) {
    return { error: err };
  }
};
export const getOrdersByUserId = async (userId, token) => {
  try {
    const request = await axiosInstance.get(`/sales/${userId}`, {
      headers: { Authorization: token },
    });

    return request;
  } catch (err) {
    return { error: err.response };
  }
};

export const getOrdersBySellerId = async (sellerId, token) => {
  try {
    const request = await axiosInstance.get(`/sales/seller/${sellerId}`, {
      headers: { Authorization: token },
    });

    return request;
  } catch (err) {
    return { error: err.response };
  }
};

export const getOrderByID = async (id, token) => {
  try {
    const request = await axiosInstance.get(`/sales/order/${id}`, {
      headers: { Authorization: token },
    });

    return request.data;
  } catch (err) {
    return { error: err.response };
  }
};

export const updateStatusOrderById = async (body, id, token) => {
  try {
    await axiosInstance.patch(`/sales/updateStatus/${id}`, body, {
      headers: { Authorization: token },
    });
  } catch (err) {
    return { error: err.response };
  }
};

export const t = () => t;
