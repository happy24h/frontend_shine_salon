import { createSlice } from '@reduxjs/toolkit';
const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blog: {
            listData: null,
            isFetching: false,
            error: false,
            detailData: null,
        },
    },
    reducers: {
        getBlogStart: (state) => {
            state.blog.isFetching = true;
        },
        getBlogSuccess: (state, action) => {
            state.blog.isFetching = false;
            state.blog.error = false;
            state.blog.listData = action.payload;
        },
        getBlogFailed: (state) => {
            state.blog.isFetching = false;
            state.blog.error = true;
        },
        createBlogStart: (state) => {
            state.blog.isFetching = true;
        },
        createBlogSuccess: (state, action) => {
            state.blog.isFetching = false;
            state.blog.error = false;
            state.blog.listData = action.payload;
        },
        createBlogFailed: (state) => {
            state.blog.isFetching = false;
            state.blog.error = true;
        },
        detailBlogStart: (state) => {
            state.blog.isFetching = true;
        },
        detailBlogSuccess: (state, action) => {
            state.blog.isFetching = false;
            state.blog.error = false;
            state.blog.detailData = action.payload;
        },
        detailBlogFailed: (state) => {
            state.blog.isFetching = false;
            state.blog.error = true;
        },
        editBlogStart: (state) => {
            state.blog.isFetching = true;
        },
        editBlogSuccess: (state, action) => {
            state.blog.isFetching = false;
            state.blog.error = false;
            state.blog.detailData = action.payload;
        },
        editBlogFailed: (state) => {
            state.blog.isFetching = false;
            state.blog.error = true;
        },
        deleteBlogStart: (state) => {
            state.blog.isFetching = true;
        },
        deleteBlogSuccess: (state) => {
            state.branch.isFetching = false;
        },
        deleteBlogFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },
    },
});

export const {
    getBlogStart,
    getBlogSuccess,
    getBlogFailed,
    createBlogStart,
    createBlogSuccess,
    createBlogFailed,
    detailBlogStart,
    detailBlogSuccess,
    detailBlogFailed,
    editBlogStart,
    editBlogSuccess,
    editBlogFailed,
    deleteBlogStart,
    deleteBlogSuccess,
    deleteBlogFailed,
} = blogSlice.actions;

export default blogSlice.reducer;
