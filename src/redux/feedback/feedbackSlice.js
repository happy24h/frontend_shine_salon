import { createSlice } from '@reduxjs/toolkit';
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        feedback: {
            feedbackCurrent: null,
            isFetching: false,
            error: false,
            detailFeedback: null,
        },
    },
    reducers: {
        feedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        feedbackSuccess: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.error = false;
            state.feedback.feedbackCurrent = action.payload;
        },
        feedbackFailed: (state) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
        },

        detailFeedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        detailFeedbackSuccess: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.error = false;
            state.feedback.detailFeedback = action.payload;
        },
        detailFeedbackFailed: (state) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
        },

        deleteFeedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        deleteFeedbackSuccess: (state) => {
            state.feedback.isFetching = false;
            state.feedback.error = false;
        },
        deleteFeedbackFailed: (state) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
        },
    },
});

export const { feedbackStart, feedbackSuccess, feedbackFailed,
                detailFeedbackStart, detailFeedbackSuccess, detailFeedbackFailed,
                deleteFeedbackStart, deleteFeedbackSuccess, deleteFeedbackFailed
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
