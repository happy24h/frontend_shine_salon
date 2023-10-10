import { createSlice } from '@reduxjs/toolkit';
const cloudImageSlice = createSlice({
    name: 'cloudImage',
    initialState: {
        cloudImage: {
            cloudImageCurrent: null,
            isFetching: false,
            error: false,
            detailCloud: null,
        },
    },
    reducers: {
        cloudImageStart: (state) => {
            state.cloudImage.isFetching = true;
        },
        cloudImageSuccess: (state, action) => {
            state.cloudImage.isFetching = false;
            state.cloudImage.error = false;
            state.cloudImage.cloudImageCurrent = action.payload;
        },
        cloudImageFailed: (state) => {
            state.cloudImage.isFetching = false;
            state.cloudImage.error = true;
        },

        detailCloudStart: (state) => {
            state.cloudImage.isFetching = true;
        },
        detailCloudSuccess: (state, action) => {
            state.cloudImage.isFetching = false;
            state.cloudImage.error = false;
            state.cloudImage.detailCloud = action.payload;
        },
        detailCloudFailed: (state) => {
            state.cloudImage.isFetching = false;
            state.cloudImage.error = true;
        },

        deleteCloudStart: (state) => {
            state.cloudImage.isFetching = true;
        },
        deleteCloudSuccess: (state) => {
            state.cloudImage.isFetching = false;
            state.cloudImage.error = false;
        },
        deleteCloudFailed: (state) => {
            state.cloudImage.isFetching = false;
            state.cloudImage.error = true;
        },
    },
});

export const { cloudImageStart, cloudImageSuccess, cloudImageFailed,
    detailCloudStart, detailCloudSuccess, detailCloudFailed,
    deleteCloudStart, deleteCloudSuccess, deleteCloudFailed,
} = cloudImageSlice.actions;

export default cloudImageSlice.reducer;
