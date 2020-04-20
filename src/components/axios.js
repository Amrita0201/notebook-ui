import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8084'
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default instance;