import axios from 'axios';

const searchRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, params = {}) => {
    const response = await searchRequest.get(path, params);
    return response.data;
};

export default searchRequest;
