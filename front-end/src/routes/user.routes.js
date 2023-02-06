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
    return request.data;
  } catch (err) {
    return { error: err.response };
  }
};

export const deleteUserById = async (id) => {
  try {
    const users = await axiosInstance.delete(`user/${id}`);
    return users;
  } catch (err) {
    return { error: err.response };
  }
};
