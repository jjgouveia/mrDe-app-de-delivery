import axiosInstance from './axios';

const login = async (body) => {
  const request = await axiosInstance.post('/login', body);
  return request;
};

const setAuthorizationToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

export {
  login,
  setAuthorizationToken,
};
