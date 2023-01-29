import axiosInstance from './axios';

const getSellers = async () => {
  try {
    const request = await axiosInstance.get('user/sellers');
    return request.data;
  } catch (err) {
    return { error: err.response };
  }
};

export default getSellers;
