import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8084'
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

instance.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
