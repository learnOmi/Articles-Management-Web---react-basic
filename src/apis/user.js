import request from 'utils/request';

/**
 * For login
 * @param {string} mobile mobile number
 * @param {string} code validation code
 * @returns 
 */
const login = (mobile, code) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  });
}

const getUserInfo = () => {
  return request({
    url: '/user/profile',
    method: 'GET'
  });
}

export { login, getUserInfo };