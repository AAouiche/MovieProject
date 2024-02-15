import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";
import agent from "../../api/Agent";
import { MovieReview } from "../../models/MovieReview";

interface ReviewsState {
    reviews: MovieReview[]; 
    isLoading: boolean;
    error: string | null;
}


const initialState: ReviewsState = {
    reviews: [],
    isLoading: false,
    error: null,
};

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (movieId:string, { rejectWithValue }) => {
        try {
            const response = await agent.MovieReviewService.getReviews(movieId);
            return response;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || 'Could not fetch reviews');
        }
    }
);

// Create a new review
export const createReview = createAsyncThunk(
    'reviews/createReview',
    async (review:MovieReview, { rejectWithValue }) => {
        try {
            const response = await agent.MovieReviewService.createReview(review);
            return response;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || 'Failed to create review');
        }
    }
);
export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to fetch reviews';
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
           
    },
});


export const { /* export any non-async actions here */ } = reviewSlice.actions;

export default reviewSlice.reducer;