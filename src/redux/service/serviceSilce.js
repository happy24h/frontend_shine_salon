import { createSlice } from '@reduxjs/toolkit';
const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        service: {
            serviceCurrent: null,
            isFetching: false,
            error: false,
            // detailService: null,
            typeService: null,
        },
    },
    reducers: {
        // Service
        serviceStart: (state) => {
            state.service.isFetching = true;
        },
        serviceSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.error = false;
            state.service.serviceCurrent = action.payload;
        },
        serviceFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },
        // //Type service
        // typeServiceStart: (state) => {
        //     state.service.isFetching = true;
        // },
        // typeServiceSuccess: (state, action) => {
        //     state.service.isFetching = false;
        //     state.service.error = false;
        //     state.service.typeService = action.payload;
        // },
        // typeServiceFailed: (state) => {
        //     state.service.isFetching = false;
        //     state.service.error = true;
        // },
        //Detail service
        detailServiceStart: (state) => {
            state.service.isFetching = true;
        },
        detailServiceSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.error = false;
            state.service.detailService = action.payload;
        },
        detailServiceFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },
        // Delete Service
        deleteServiceStart: (state) => {
            state.service.isFetching = true;
        },
        deleteServiceSuccess: (state) => {
            state.service.isFetching = false;
            state.service.error = false;
        },
        deleteServiceFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },
    },
});

export const { serviceStart, serviceSuccess, serviceFailed,
    detailServiceStart, detailServiceSuccess, detailServiceFailed,
    // typeServiceStart, typeServiceSuccess, typeServiceFailed,
    deleteServiceStart, deleteServiceSuccess, deleteServiceFailed
} = serviceSlice.actions;

export default serviceSlice.reducer;
