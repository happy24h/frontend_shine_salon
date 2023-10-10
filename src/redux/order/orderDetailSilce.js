import { createSlice } from '@reduxjs/toolkit';
const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        orderDetail: {
            orderDetailCurrent: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // Order
        orderDetailStart: (state) => {
            state.orderDetail.isFetching = true;
        },
        orderDetailSuccess: (state, action) => {
            state.orderDetail.isFetching = false;
            state.orderDetail.error = false;
            state.orderDetail.orderDetailCurrent = action.payload;
        },
        orderDetailFailed: (state) => {
            state.orderDetail.isFetching = false;
            state.orderDetail.error = true;
        },
    },
});

export const { orderDetailStart, orderDetailSuccess, orderDetailFailed,
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;