import { createSlice } from '@reduxjs/toolkit';
const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        voucher: {
            voucherCurrent: null,
            isFetching: false,
            error: false,
            detailVoucher: null,
        },
    },
    reducers: {
        //Type voucher
        voucherStart: (state) => {
            state.voucher.isFetching = true;
        },
        voucherSuccess: (state, action) => {
            state.voucher.isFetching = false;
            state.voucher.error = false;
            state.voucher.voucherCurrent = action.payload;
        },
        voucherFailed: (state) => {
            state.voucher.isFetching = false;
            state.voucher.error = true;
        },
        //Detail voucher
        detailVoucherStart: (state) => {
            state.voucher.isFetching = true;
        },
        detailVoucherSuccess: (state, action) => {
            state.voucher.isFetching = false;
            state.voucher.error = false;
            state.voucher.detailVoucher = action.payload;
        },
        detailVoucherFailed: (state) => {
            state.voucher.isFetching = false;
            state.voucher.error = true;
        },
        // Delete Voucher
        deleteVoucherStart: (state) => {
            state.voucher.isFetching = true;
        },
        deleteVoucherSuccess: (state) => {
            state.voucher.isFetching = false;
            state.voucher.error = false;
        },
        deleteVoucherFailed: (state) => {
            state.voucher.isFetching = false;
            state.voucher.error = true;
        },
    },
});

export const { voucherStart, voucherSuccess, voucherFailed,
    detailVoucherStart, detailVoucherSuccess, detailVoucherFailed,
    deleteVoucherStart, deleteVoucherSuccess, deleteVoucherFailed
} = voucherSlice.actions;

export default voucherSlice.reducer;
