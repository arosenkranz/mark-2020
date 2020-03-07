import axios from 'axios';

const baseURL =
  location.hostname === 'localhost'
    ? 'http://localhost:3001/'
    : 'https://mark-galaxy.herokuapp.com/';

export const getTweets = () => {
  return axios.get(`${baseURL}api/twitter`);
};
