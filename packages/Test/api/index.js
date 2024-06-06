import instance from '../../utils/axios';

export const checkToken = (data, baseUrl) => instance({
  url: `${baseUrl}/user/checkToken`,
  method: 'get',
  params: data,
  Headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const getUserInfo = (data, baseUrl) => instance({
  url: `${baseUrl}/user/getUserInfo`,
  method: 'get',
  params: data,
  Headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default {
  getUserInfo,
  checkToken,
};
