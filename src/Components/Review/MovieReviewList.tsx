import { useEffect, useState } from "react";
import { deleteReview, fetchReviews, reviewSlice, upvoteReview } from "../../redux/Slices/MovieReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { Card, CardContent, Typography, CircularProgress, Box, Grid, Avatar, Rating, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { format } from 'date-fns';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Review from "./Review";
import { SortCriteria, SortField } from "../../models/SortCriteria";

interface MovieReviewsListProps {
  movieId: string;
}

const MovieReviewsList = ({ movieId }: MovieReviewsListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.movieReview.reviews);
  const isLoading = useSelector((state: RootState) => state.movieReview.isLoading);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
      dispatch(fetchReviews(movieId));
  }, [dispatch, movieId]);

  const handleSortFieldChange = (event: SelectChangeEvent<string>) => {
      const field = event.target.value as SortField;
      setSortField(field);
      dispatch(reviewSlice.actions.sortReviewsBy({ field, order: sortOrder }));
  };

  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
      const order = event.target.value as 'desc' | 'asc';
      setSortOrder(order);
      dispatch(reviewSlice.actions.sortReviewsBy({ field: sortField, order }));
  };
  const handleDelete = (reviewId: number) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
        dispatch(deleteReview(reviewId));
    }
};

  if (isLoading) return <CircularProgress />;

  return (
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Movie Reviews
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              <Select
                  value={sortField}
                  onChange={handleSortFieldChange}
                  sx={{ bgcolor: 'primary.light', color: 'white' }}
              >
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="upvotes">Upvotes</MenuItem>
              </Select>

              <Select
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  sx={{ bgcolor: 'secondary.light', color: 'white' }}
              >
                  <MenuItem value="desc">Low to High</MenuItem>
                  <MenuItem value="asc">High to Low</MenuItem>
              </Select>
          </Box>

          {reviews.length === 0 ? (
              <Typography variant="subtitle1">No reviews available.</Typography>
          ) : (
            reviews.map((review) => (
             
                  <Review key={review.ReviewId} reviews={review} />
              
          ))
          )}
      </Box>
  );
};

export default MovieReviewsList;