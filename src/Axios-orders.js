import axios from 'axios';

const instance = axios.create({
    baseURL : "https://burger-app-2ae38.firebaseio.com/"
})
   


export default instance;
