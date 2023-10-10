import { createSlice } from '@reduxjs/toolkit';
const dashBoarServiceSlices = createSlice({
    name: 'dashBoarServiceSlice',
    initialState: {
        dashboardService: {
            listData: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getDashboardServiceStart: (state) => {
            state.dashboardService.isFetching = true;
        },
        getDashboardService: (state, action) => {
            state.dashboardService.isFetching = false;
            state.dashboardService.error = false;
            state.dashboardService.listData = action.payload;
        },
        cleanDashboardService: (state, action) => {
            state.dashboardService.isFetching = false;
            state.dashboardService.error = false;
            state.dashboardService.listData = null;
        },

    },
});

export const {
    getDashboardService,
    getDashboardServiceStart,
    cleanDashboardService,
} = dashBoarServiceSlices.actions;

export default dashBoarServiceSlices.reducer;
