import axiosInstance from './axios';

export const requestOrder = async (body, token) => {
  console.log('REQUEST BODY FRONTEND', body);
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
