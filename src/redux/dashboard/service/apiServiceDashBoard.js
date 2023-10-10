import axios from 'axios';
import { toast } from 'react-toastify';
import ApiConfig from '~/service/ApiConfig';

export const getDashBoardBar = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardBarService, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};

export const getDashBoardCountServicesAndStaff = async (dataValues, accessToken) => {
    try {
        const res = await axios.post(ApiConfig.getDashBoardCountServicesAndStaff, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (err) {
        toast.error(err.response.data.message);
    }
};
