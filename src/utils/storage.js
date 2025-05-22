const Token_key = 'RandomTOken_0021w';

/**
 * @description: 设置token
 * @param {string} token
 * @return {void}
 */

const setToken = (token) => {
  localStorage.setItem(Token_key, token);
}

/**
 * @description: 获取token
 * @returns {string} token
 */
const getToken = () => {
  return localStorage.getItem(Token_key);
}

/**
 * @description: 删除token
 * @return {void}
 */
const removeToken = () => {
  localStorage.removeItem(Token_key);
}

/**
 * @description: 判断token是否存在
 * @returns {boolean} true: token存在，false: token不存在
 */
const hasToken = () => {
  return !!getToken();
}

export {setToken,getToken,removeToken,hasToken};