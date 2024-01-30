import Cookies from 'js-cookie';

export const BASE_URL = 'http://localhost:3000';

export function sendRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    console.error('Ошибка сервера:', res.status, res.statusText);
    return res.json()
      .then((errorData) => {
        console.error('Данные ошибки:', errorData);
        throw new Error(errorData.message || `Ошибка: ${res.status} ${res.statusText}`);
      })
  }
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
    .then(sendRequest);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then((res) => {
    console.log('Server response:', res);

    return res.json().then(data => {
      console.log('Server response data:', data);

      if (res.ok) {
        console.log('Authorized user:', data.data);

        // Сохраните токен в cookies
        Cookies.set('token', data.token);

        return data;
      } else {
        throw new Error(data.message || `Ошибка: ${res.status} ${res.statusText}`);
      }
    });
  });
};


export const checkToken = () => {
  const token = Cookies.get('token');
  console.log(token); // Вывод токена в консоль
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(sendRequest)
    .catch(error => {
      console.error('Error during checkToken:', error);
      throw error; // Передача ошибки дальше для обработки
    });
};
