import { createSlice } from '@reduxjs/toolkit';
const typeServiceSlice = createSlice({
    name: 'typeService',
    initialState: {
        typeService: {
            typeServiceCurrent: null,
            isFetching: false,
            error: false,
            detailTypeService: null,
        },
    },
    reducers: {
        //Type typeService
        typeServiceStart: (state) => {
            state.typeService.isFetching = true;
        },
        typeServiceSuccess: (state, action) => {
            state.typeService.isFetching = false;
            state.typeService.error = false;
            state.typeService.typeServiceCurrent = action.payload;
        },
        typeServiceFailed: (state) => {
            state.typeService.isFetching = false;
            state.typeService.error = true;
        },
        //Detail typeService
        detailTypeServiceStart: (state) => {
            state.typeService.isFetching = true;
        },
        detailTypeServiceSuccess: (state, action) => {
            state.typeService.isFetching = false;
            state.typeService.error = false;
            state.typeService.detailTypeService = action.payload;
        },
        detailTypeServiceFailed: (state) => {
            state.typeService.isFetching = false;
            state.typeService.error = true;
        },
        // Delete TypeService
        deleteTypeServiceStart: (state) => {
            state.typeService.isFetching = true;
        },
        deleteTypeServiceSuccess: (state) => {
            state.typeService.isFetching = false;
            state.typeService.error = false;
        },
        deleteTypeServiceFailed: (state) => {
            state.typeService.isFetching = false;
            state.typeService.error = true;
        },
    },
});

export const { typeServiceStart, typeServiceSuccess, typeServiceFailed,
    detailTypeServiceStart, detailTypeServiceSuccess, detailTypeServiceFailed,
    deleteTypeServiceStart, deleteTypeServiceSuccess, deleteTypeServiceFailed
} = typeServiceSlice.actions;

export default typeServiceSlice.reducer;
