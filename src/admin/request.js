import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}


axios.interceptors.response.use(
    response => response,
    async error => {
        const request = error.config;

        if (error.response.status === 401) {
            const response = await axios.post('/refreshToken');
            const token = response.data.token;

            localStorage.setItem('token', token);

            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            request.headers['Authorization'] = `Bearer ${token}`;

            return axios(
                request,
            );
        }

        return Promise.reject(error);
        // console.dir(error);
    },
);
export default axios;