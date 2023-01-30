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

export const t = () => t;
