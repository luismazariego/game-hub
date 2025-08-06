import axios from 'axios';

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "0710a65a76da4f678d089d75a6a4e1dd"
  }
});