import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://gadgetsehat-dashboard.vercel.app/api',
});

export default axios;
