import { createSlice } from '@reduxjs/toolkit';
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {
            orderCurrent: null,
            isFetching: false,
            error: false,
            createData: null,
        },
    },
    reducers: {
        // Order
        orderStart: (state) => {
            state.order.isFetching = true;
        },
        orderSuccess: (state, action) => {
            state.order.isFetching = false;
            state.order.error = false;
            state.order.orderCurrent = action.payload;
        },
        orderFailed: (state) => {
            state.order.isFetching = false;
            state.order.error = true;
        },
        createOderStart: (state) => {
            state.order.isFetching = true;
        },
        createOderSuccess: (state, action) => {
            state.order.isFetching = false;
            state.order.error = false;
            state.order.createData = action.payload;
        },
        createOderFailed: (state) => {
            state.order.isFetching = false;
            state.order.error = true;
        },
        createOderDetailStart: (state) => {
            state.order.isFetching = true;
        },
        createOderDetailSuccess: (state, action) => {
            state.order.isFetching = false;
            state.order.error = false;
            // state.order.createData = action.payload;
        },
        createOderDetailFailed: (state) => {
            state.order.isFetching = false;
            state.order.error = true;
        },
    },
});

export const {
    orderStart,
    orderSuccess,
    orderFailed,
    createOderStart,
    createOderSuccess,
    createOderFailed,
    createOderDetailStart,
    createOderDetailSuccess,
    createOderDetailFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
