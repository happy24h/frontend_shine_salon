import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    getBranchStart,
    getBranchSuccess,
    getBranchFailed,
    createBranchStart,
    createBranchSuccess,
    createBranchFailed,
    deleteBranchStart,
    deleteBranchSuccess,
    deleteBranchFailed,
    detailBranchStart,
    detailBranchSuccess,
    detailBranchFailed,
    editBranchStart,
    editBranchSuccess,
    editBranchFailed,
} from './branchSlice';
import ApiConfig from '~/service/ApiConfig';

export const getBranch = async (dataValues, dispatch, accessToken) => {
    dispatch(getBranchStart());
    try {
        const res = await axios.post(ApiConfig.getBranch, dataValues);
        dispatch(getBranchSuccess(res.data));
    } catch (err) {
        dispatch(getBranchFailed());
        toast.error(err.response.data.message);
    }
};

export const createBranch = async (dataValues, dispatch, accessToken, loadApi, navigate) => {
    dispatch(createBranchStart());
    try {
        await axios.post(ApiConfig.createBranch, dataValues, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createBranchSuccess());
        loadApi();
        navigate('/system/manage-branch');
        toast.success('create branch success');
    } catch (err) {
        dispatch(createBranchFailed());
        toast.error(err.response.data.message);
    }
};

export const deleteBranch = async (id, accessToken, dispatch, handleLoading) => {
    dispatch(deleteBranchStart());
    try {
        await axios.get(`${ApiConfig.deleteBranch}/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(deleteBranchSuccess());
        handleLoading();
    } catch (err) {
        dispatch(deleteBranchFailed());
        // toast.error(err.response.data.message);
    }
};

export const getDetailBranch = async (id, dispatch, accessToken) => {
    dispatch(detailBranchStart());
    try {
        const res = await axios.get(`${ApiConfig.getDetailBranch}/${id}`);
        dispatch(detailBranchSuccess(res.data));

        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailBranchFailed());
        // toast.error(err.response.data.message);
    }
};

export const editBranch = async (id, account, dispatch, accessToken, handleUpdateApi) => {
    dispatch(editBranchStart());

    try {
        await axios.post(`${ApiConfig.editBranch}/${id}`, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(editBranchSuccess());
        toast.success('Edit success');
        handleUpdateApi();
    } catch (err) {
        dispatch(editBranchFailed());
        toast.error(err.response.data.message);
    }
};
