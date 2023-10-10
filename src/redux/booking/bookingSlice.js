import { createSlice } from '@reduxjs/toolkit';
const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        booking: {
            listData: null,
            isFetching: false,
            error: false,
            detailData: null,
            detailDataDate: null,
        },
    },
    reducers: {
        getBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        getBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = false;
            state.booking.listData = action.payload;
        },
        getBookingFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },
        createBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        createBookingSuccess: (state) => {
            state.booking.isFetching = false;
            state.booking.error = false;
        },
        createBookingFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },
        detailBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        detailBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = false;
            state.booking.detailData = action.payload;
        },
        detailBookingFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },
        detailBookingDateStart: (state) => {
            state.booking.isFetching = true;
        },
        detailBookingDateSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = false;
            state.booking.detailDataDate = action.payload;
        },
        detailBookingDateFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },
        editBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        editBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = false;
            state.booking.detailData = action.payload;
        },
        editBookingFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },
    },
});

export const {
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
} = bookingSlice.actions;

export default bookingSlice.reducer;
