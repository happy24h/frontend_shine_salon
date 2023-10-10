import { createSlice } from '@reduxjs/toolkit';
const dashBoarBookingSlices = createSlice({
    name: 'dashBoarBookingSlice',
    initialState: {
        dashboardBooking: {
            listData: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getDashboardBookingStart: (state) => {
            state.dashboardBooking.isFetching = true;
        },
        getDashboardBooking: (state, action) => {
            state.dashboardBooking.isFetching = false;
            state.dashboardBooking.error = false;
            state.dashboardBooking.listData = action.payload;
        },
        cleanDashboardBooking: (state, action) => {
            state.dashboardBooking.isFetching = false;
            state.dashboardBooking.error = false;
            state.dashboardBooking.listData = null;
        },

    },
});

export const {
    getDashboardBooking,
    getDashboardBookingStart,
    cleanDashboardBooking,
} = dashBoarBookingSlices.actions;

export default dashBoarBookingSlices.reducer;
