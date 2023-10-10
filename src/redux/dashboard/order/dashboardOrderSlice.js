import { createSlice } from '@reduxjs/toolkit';
const dashBoarOderSlices = createSlice({
    name: 'dashBoarOderSlice',
    initialState: {
        dashboardOrder: {
            listData: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getDashboardOderStart: (state) => {
            state.dashboardOrder.isFetching = true;
        },
        getDashboardOder: (state, action) => {
            state.dashboardOrder.isFetching = false;
            state.dashboardOrder.error = false;
            state.dashboardOrder.listData = action.payload;
        },
        cleanDashboardOder: (state, action) => {
            state.dashboardOrder.isFetching = false;
            state.dashboardOrder.error = false;
            state.dashboardOrder.listData = null;
        },

    },
});

export const {
    getDashboardOder,
    getDashboardOderStart,
    cleanDashboardOder,
} = dashBoarOderSlices.actions;

export default dashBoarOderSlices.reducer;
