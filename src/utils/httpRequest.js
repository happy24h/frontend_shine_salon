import axios from 'axios';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const get = async (path, params = {}) => {
    const response = await httpRequest.get(path, params);
    return response.data;
};

export default httpRequest;
