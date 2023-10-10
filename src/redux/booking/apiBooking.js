import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// booking
import {
    getBookingStart,
    getBookingSuccess,
    getBookingFailed,
    createBookingStart,
    createBookingSuccess,
    createBookingFailed,
    detailBookingStart,
    detailBookingSuccess,
    detailBookingFailed,
    detailBookingDateStart,
    detailBookingDateSuccess,
    detailBookingDateFailed,
    editBookingStart,
    editBookingSuccess,
    editBookingFailed,
} from './bookingSlice';
import ApiConfig from '~/service/ApiConfig';
export const getBooking = async (booking, dispatch, accessToken) => {
    dispatch(getBookingStart());
    try {
        const res = await axios.post(ApiConfig.getBooking, booking);
        dispatch(getBookingSuccess(res.data));
        // loadApi();
        // navigate('/system/manage-user');
        // toast.success('Tạo tài khoản thành công');
    } catch (err) {
        dispatch(getBookingFailed());
        // toast.error(err.response.data.message);
    }
};

export const createBooking = async (booking, dispatch, accessToken, navigate) => {
    dispatch(createBookingStart());
    try {
        await axios.post(ApiConfig.createBooking, booking, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(createBookingSuccess());

        navigate('/system/manage-booking');
        toast.success('Tạo lịch hẹn thành công');
    } catch (err) {
        dispatch(createBookingFailed());
        toast.error(err.response.data.message);
    }
};

export const getDetailBooking = async (id, dispatch, accessToken, getBooking) => {
    dispatch(detailBookingStart());
    try {
        const res = await axios.get(`${ApiConfig.getDetailBooking}/${id}`);
        dispatch(detailBookingSuccess(res.data));
        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailBookingFailed());
        // toast.error(err.response.data.message);
    }
};

export const getDetailBookingDate = async (id, date, dispatch) => {
    dispatch(detailBookingDateStart());
    try {
        const res = await axios.get(`${ApiConfig.getDetailBookingDate}?employee_id=${id}&date_booking=${date}`);
        dispatch(detailBookingDateSuccess(res.data));
        // toast.success('Detail success');
    } catch (err) {
        dispatch(detailBookingDateFailed());
        // toast.error(err.response.data.message);
    }
};

export const editBooking = async (id, account, dispatch, accessToken, handleUpdateApi) => {
    dispatch(editBookingStart());

    try {
        await axios.post(`${ApiConfig.editBooking}/${id}`, account, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch(editBookingSuccess());
        toast.success('Edit success');
        handleUpdateApi();
    } catch (err) {
        dispatch(editBookingFailed());
        toast.error(err.response.data.message);
    }
};
