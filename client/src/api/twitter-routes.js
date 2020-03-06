import axios from 'axios';

const baseURL =
  location.hostname === 'localhost' ? 'http://localhost:3001/' : '';

export const getTweets = () => {
  return axios.get(`${baseURL}api/twitter`);
};
