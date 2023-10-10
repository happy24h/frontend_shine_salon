import axios from 'axios';
import { toast } from 'react-toastify';
import ApiConfig from '~/service/ApiConfig';

export const getDashBoardLine = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardLine, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
export const getDashBoardPei = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardPeiOrder, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
export const getDashBoardColumn = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardColumnOrder, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};

export const getDashBoardStatus = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardStatusOrder, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
