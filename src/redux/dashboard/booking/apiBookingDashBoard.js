import axios from 'axios';
import { toast } from 'react-toastify';
import ApiConfig from '~/service/ApiConfig';

export const getDashBoardHeat = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardHeat, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
export const getDashBoardRange = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardRange, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
export const getDashBoardPei = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardPei, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
export const getDashBoardColumn = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardColumn, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
