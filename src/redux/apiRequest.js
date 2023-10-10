import axios from 'axios';
import axiosExport from '~/service/HttpService';
import ApiConfig from '~/service/ApiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth
import {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
} from './authSlice';

// Account
import {
    accountStart,
    accountSuccess,
    accountFailed,
    deleteAccountStart,
    deleteAccountsSuccess,
    deleteAccountFailed,
    createAccountStart,
    createAccountSuccess,
    createAccountFailed,
    detailAccountStart,
    detailAccountSuccess,
    detailAccountFailed,
    editAccountSuccess,
    editAccountFailed,
    editAccountStart,
} from './accountSlice';

import { roleFailed, roleStart, roleSuccess } from '~/redux/roleSlice';

export const loginUser = async (user, dispatch, navigate) => {
    // dispatch login start
    dispatch(loginStart());

    try {
        // dispatch login success
        const res = await axios.post(ApiConfig.loginUser, user);
        dispatch(loginSuccess(res.data));
        if (res.data.isAdmin) {
            navigate('/system/manage-user');
        } else {
            navigate('/');
        }
        console.log('check res login ', res.data.isAdmin);
        toast.success('Đăng nhập thành công');
    } catch (err) {
        // dispatch login failed
        dispatch(loginFailed());
        toast.error('Chưa nhập đúng thông tin');
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(ApiConfig.registerCustomer, user);
        dispatch(registerSuccess());
        navigate('/form-login');
        toast.success('Đăng ký thành công');
    } catch (err) {
        dispatch(registerFailed());
        toast.error(err.response.data.message);
    }
};

export const logOut = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        dispatch(logOutSuccess());
        navigate('/form-login');
        toast.success('Logout success');
    } catch (err) {
        dispatch(logOutFailed());
        toast.error(err.response.data.message);
    }
};

export const getAllAccount = async (account, dispatch, token) => {
    dispatch(accountStart());
    try {
        const res = await axios.post(ApiConfig.getAllAccount, account);
        console.log('check ', res);
        dispatch(accountSuccess(res.data));
    } catch (err) {
        dispatch(accountFailed());
        toast.error(err.response.data.message);
    }
};

export const getAllRoles = async (dispatch, accessToken) => {
    dispatch(roleStart());
    try {
        const res = await axios.get(ApiConfig.getAllRoles, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(roleSuccess(res.data));
    } catch (err) {
        dispatch(roleFailed());
        toast.error(err.response.data.message);
    }
};

export const deleteAccount = async (id, accessToken, dispatch) => {
    dispatch(deleteAccountStart());
    try {
        const res = await axios.get(`${ApiConfig.deleteAccount}/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(deleteAccountsSuccess());
    } catch (err) {
        dispatch(deleteAccountFailed());
    }
};

export const createAccount = async (account, dispatch, accessToken, loadApi, navigate) => {
    dispatch(createAccountStart());
    try {
        await axiosExport.post(ApiConfig.register, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createAccountSuccess());
        loadApi();
        navigate('/system/manage-user');
        toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(createAccountFailed());
        toast.error(err.response.data.message);
    }
};

export const createAccountCustomer = async (account, dispatch, accessToken) => {
    dispatch(createAccountStart());
    try {
        await axios.post(ApiConfig.createAccountCustomer, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createAccountSuccess());
        toast.success('Tạo tài khoản thành công');
        // handleCancel();
    } catch (err) {
        dispatch(createAccountFailed());
        toast.error(err.response.data.message);
    }
};

export const getDetailAccount = async (id, dispatch, accessToken) => {
    dispatch(detailAccountStart());
    try {
        const res = await axios.get(`${ApiConfig.getDetailAccount}/${id}`);
        dispatch(detailAccountSuccess(res.data));
        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailAccountFailed());
        toast.error(err.response.data.message);
    }
};

export const editDetailAccount = async (id, account, dispatch, accessToken, handleUpdateApi) => {
    dispatch(editAccountStart());
    try {
        const res = await axios.post(`${ApiConfig.editDetailAccount}/${id}`, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(editAccountSuccess());
        toast.success('Edit success');
        handleUpdateApi();
    } catch (err) {
        dispatch(editAccountFailed());
        toast.error(err.response.data.message);
    }
};
