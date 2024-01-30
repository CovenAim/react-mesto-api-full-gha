import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // Токен будет храниться в куках сроком на 7 дней
}

export const getToken = () => Cookies.get(TOKEN_KEY);

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
}
