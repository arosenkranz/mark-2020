import axios from 'axios';

const baseURL = 'https://mark-galaxy.herokuapp.com/';

export const getTweets = () => {
  return axios.get(`${baseURL}api/twitter`);
};
