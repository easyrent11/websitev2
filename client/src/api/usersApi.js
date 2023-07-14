import axios from 'axios';

const BASE_URL = "http://localhost:3001/user";


//#######################################################################
//                                Users apis.                           #
//#######################################################################
export const register = (registerInfo) => {
  return axios.post(`${BASE_URL}/register`, registerInfo);
};
export const login = (loginInfo) => {
  return axios.post(`${BASE_URL}/login`, loginInfo);
};

export const addCar = (carInfo) => {
  return axios.post(`${BASE_URL}/addcar`, carInfo);
}

export const getAllUserDetails = (userId) => axios.get(`${BASE_URL}/getuser/${userId}`);

export const resetPassword = (info) => axios.post(`${BASE_URL}/changepassword`, info);

// Make an API call to send the verification code to the user's email
const sendVerificationCode = (email) => axios.post(`${BASE_URL}/sendVerificationCode`,email);
