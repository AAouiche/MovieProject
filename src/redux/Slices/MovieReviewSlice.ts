import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";
import agent from "../../api/Agent";
import { MovieReview } from "../../models/MovieReview";
import { SortCriteria } from "../../models/SortCriteria";
import { ReviewUpdate } from "../../models/ReviewUpdate";

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
            console.log("thunk fetch reviews",response);
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
export const upvoteReview = createAsyncThunk(
    'reviews/upvoteReview',
    async (reviewId: number, { rejectWithValue }) => {
        try {
            const response = await agent.MovieReviewService.upvoteReview(reviewId);
            return { reviewId, UpvoteCount: response.UpvoteCount }; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to upvote review');
        }
    }
);

//delete
export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewId: number, { rejectWithValue }) => {
        try {
            await agent.MovieReviewService.deleteReview(reviewId);
            return reviewId; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to delete review');
        }
    }
);

//update
export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async (review: ReviewUpdate, { rejectWithValue }) => {
        try {
            const response = await agent.MovieReviewService.updateReview(review);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to update review');
        }
    }
);

//sorting
 

const sortReviews = (reviews: MovieReview[], criteria: SortCriteria): MovieReview[] => {
    return [...reviews].sort((a, b) => {
        let comparison = 0;
        switch (criteria.field) {
            case 'date':
                comparison = new Date(b.ReviewDate).getTime() - new Date(a.ReviewDate).getTime();
                break;
            case 'rating':
                comparison = b.Rating - a.Rating;
                break;
            case 'upvotes':
                comparison = b.UpVotes - a.UpVotes;
                break;
        }
        return criteria.order === 'asc' ? comparison : -comparison;
    });
};
export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        sortReviewsBy: (state, action: PayloadAction<SortCriteria>) => {
            state.reviews = sortReviews(state.reviews, action.payload);
        },
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
            .addCase(upvoteReview.fulfilled, (state, action) => {
                const { reviewId, UpvoteCount } = action.payload;
                const reviewIndex = state.reviews.findIndex(review => review.ReviewId === reviewId);
                if (reviewIndex !== -1) {
                    state.reviews[reviewIndex].UpVotes = UpvoteCount;
                }
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(review => review.ReviewId !== action.payload);
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const updatedIndex = state.reviews.findIndex(review => review.ReviewId === action.payload.ReviewId);
                if (updatedIndex !== -1) {
                    state.reviews[updatedIndex] = action.payload;
                }
            });
            
           
    },
});




export default reviewSlice.reducer;