import { createSlice } from '@reduxjs/toolkit';
const roleSlice = createSlice({
    name: 'role',
    initialState: {
        role: {
            roleCurrent: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        roleStart: (state) => {
            state.role.isFetching = true;
        },
        roleSuccess: (state, action) => {
            state.role.isFetching = false;
            state.role.error = false;
            state.role.roleCurrent = action.payload;
        },
        roleFailed: (state) => {
            state.role.isFetching = false;
            state.role.error = true;
        },
    },
});

export const {
    roleStart,
    roleSuccess,
    roleFailed,
} = roleSlice.actions;

export default roleSlice.reducer;
