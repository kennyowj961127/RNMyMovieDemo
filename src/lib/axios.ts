//Axios libray
import axios from 'axios';
//A querystring parsing and stringifying library
import qs from 'qs';

const instance = axios.create({
    timeout: 3000,
    // headers: { 'X-Custom-Header': '2b7472e34b8949d5d5364edade2c0f9c' },
    paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    cancelToken: new axios.CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        //console.log('cancelToken', c);
    }),
    signal: new AbortController().signal
});

instance.interceptors.request.use(
    config => {
        //console.log('Request Interceptor - URL:', config.url);
        //console.log('Request Interceptor - Headers:', config.headers);
        return config;
    }
);

instance.interceptors.response.use(
    response => {
        // console.log('Response Interceptor', response);
        return response;
    }
);

export default instance;