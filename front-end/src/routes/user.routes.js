import axiosInstance from './axios';

export const getSellers = async () => {
  try {
    const request = await axiosInstance.get('user/');
    const sellers = request.data.filter((e) => e.role === 'seller');
    return sellers;
  } catch (err) {
    return { error: err.response };
  }
};

export const getUsers = async () => {
  try {
    const request = await axiosInstance.get('user/');
    // const sellers = request.data.filter((e) => e.role === 'seller');
    return request.data;
  } catch (err) {
    return { error: err.response };
  }
};
