import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8078/',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

axiosClient.interceptors.response.use((response) => {
    // eslint-disable-next-line no-unused-vars
    const { data } = response;
    return response.data;
});

export default axiosClient;
