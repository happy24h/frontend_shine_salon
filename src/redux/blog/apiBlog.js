import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// blog
import {
    getBlogStart,
    getBlogSuccess,
    getBlogFailed,
    createBlogStart,
    createBlogSuccess,
    createBlogFailed,
    detailBlogStart,
    detailBlogSuccess,
    detailBlogFailed,
    editBlogStart,
    editBlogSuccess,
    editBlogFailed,
    deleteBlogStart,
    deleteBlogSuccess,
    deleteBlogFailed,
} from './blogSlice';
import ApiConfig from '~/service/ApiConfig';
export const getBlog = async (account, dispatch, accessToken) => {
    dispatch(getBlogStart());
    try {
        const res = await axios.post(ApiConfig.getBlog, account);
        dispatch(getBlogSuccess(res.data));
    } catch (err) {
        dispatch(getBlogFailed());
        toast.error(err.response.data.message);
    }
};

export const createBlog = async (account, dispatch, accessToken, loadApi, navigate) => {
    dispatch(createBlogStart());
    try {
        await axios.post(ApiConfig.createBlog, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createBlogSuccess());
        loadApi();
        navigate('/system/manage-blog');
        toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(createBlogFailed());
        toast.error(err.response.data.message);
    }
};

export const getDetailBlog = async (id, dispatch, accessToken, getBlog) => {
    dispatch(detailBlogStart());
    try {
        const res = await axios.get(`${ApiConfig.getDetailBlog}/${id}`);
        dispatch(detailBlogSuccess(res.data));

        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailBlogFailed());
        toast.error(err.response.data.message);
    }
};

export const editBlog = async (id, account, dispatch, accessToken, handleUpdateApi) => {
    dispatch(editBlogStart());

    try {
        await axios.post(`${ApiConfig.editBlog}/${id}`, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(editBlogSuccess());
        toast.success('Edit success');
        handleUpdateApi();
    } catch (err) {
        dispatch(editBlogFailed());
        toast.error(err.response.data.message);
    }
};

export const deleteBlog = async (id, dispatch, token) => {
    dispatch(deleteBlogStart());
    try {
        await axios.get(`${ApiConfig.deleteBlog}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(deleteBlogSuccess());
        toast.success('xóa thành thành công');
    } catch (err) {
        dispatch(deleteBlogFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
};
