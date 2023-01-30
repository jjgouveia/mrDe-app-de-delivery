import axiosInstance from './axios';

const USER_CONFLICT = 409;

export const postRegister = async (registerValues) => {
  try {
    const request = await axiosInstance.post('/register', registerValues, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (request.status === USER_CONFLICT) {
      return request.status;
    }
    return request;
  } catch (err) {
    return { error: err.response };
  }
};

export const postRegisterManager = async (body, token) => {
  // console.log('REQUEST BODY FRONTEND', body);
  try {
    const request = await axiosInstance.post('/managerRegister', body, {
      headers: { Authorization: token },
    });
    console.log('REQUEST ', request);
    if (request.status === USER_CONFLICT) {
      return request.status;
    }

    return request;
  } catch (err) {
    return err.response.status;
  }
};

export const t = () => t;
