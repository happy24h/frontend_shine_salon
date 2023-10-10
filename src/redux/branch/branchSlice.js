import { createSlice } from '@reduxjs/toolkit';
const branchSlice = createSlice({
    name: 'branch',
    initialState: {
        branch: {
            listData: null,
            isFetching: false,
            error: false,
            detailData: null,
        },
    },
    reducers: {
        getBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        getBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = false;
            state.branch.listData = action.payload;
        },
        getBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },

        createBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        createBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = false;
            state.branch.listData = action.payload;
        },
        createBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },
        deleteBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        deleteBranchSuccess: (state) => {
            state.branch.isFetching = false;
        },
        deleteBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },
        detailBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        detailBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = false;
            state.branch.detailData = action.payload;
        },
        detailBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },
        editBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        editBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = false;
            state.branch.detailData = action.payload;
        },
        editBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },
    },
});

export const {
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
} = branchSlice.actions;

export default branchSlice.reducer;
