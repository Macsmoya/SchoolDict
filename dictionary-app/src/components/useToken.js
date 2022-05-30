import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  function getUser(){
    const userEmail = localStorage.getItem('email');
    return userEmail
  }

  const [token, setToken] = useState(getToken());
  const [userId] = useState(getUser());

  function saveToken(userToken, userEmail) {
    localStorage.setItem('token', userToken);
    localStorage.setItem('email', userEmail);

    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem('email');
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    userId,
    removeToken
  }

}

export default useToken;