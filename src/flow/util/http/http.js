import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const {dispatch} = store;

// const { dispatch } = store;

const http = axios.create({
  timeout: 2000,
  headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
});

// Add token to every request
http.interceptors.request.use(
  async (config) => {
   
      config.headers.Authorization = `${token}`;
    const token = await AsyncStorage.getItem('token');
    if (token) {

      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

// handle the unauthorized exception
http.interceptors.response.use(function(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // debugger
  return response;
}, async function(error, t1) {

  if (error &&  error.response && error.response.status == '401') {
    
    return {
      status: "401",
      message: "Chưa đăng nhập"
    }
  } else if (error &&  error.response && error.response.status == '500') {
    return {
      status: "500",
      message: "Chưa đăng nhập"
    }
  }
  throw 'Lỗi từ server';
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // return Promise.reject(error);
});


export default http;
