import axios from 'axios';
const BASE_URL = "http://localhost:3001/cars";


//#######################################################################
//                                Cars apis.                            #
//#######################################################################

export const searchCars = (requestData) => {
  return axios.post(`${BASE_URL}/searchcar`, requestData);
};

export const getAllCars = () => {
  return axios.get(`${BASE_URL}/getallcars`);
}

export const checkIfCarExists = (platesNumber) => {
  return axios.post(`${BASE_URL}/checkcarexists`, platesNumber);
}

