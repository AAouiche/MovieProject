import { MovieReview } from "../../models/MovieReview";
import { Card, CardContent, Typography, Box, Avatar, Rating, Button, Modal, TextField } from '@mui/material';
import { format } from 'date-fns';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { deleteReview, updateReview, upvoteReview } from "../../redux/Slices/MovieReviewSlice";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ReviewUpdate } from "../../models/ReviewUpdate";
import StarRating from "../Ui/stars/StarRating";

interface ReviewProps {
    reviews: MovieReview;
  }
  
function Review({ reviews }: ReviewProps) {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const isAuthor = currentUser && currentUser.UserName === reviews.UserName;

    const handleUpvote = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        dispatch(upvoteReview(reviews.ReviewId));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            dispatch(deleteReview(reviews.ReviewId));
        }
    };

    const handleUpdate = async (values: { content: string; rating: number }) => {
        const updatedReview: ReviewUpdate = {
            ReviewId: reviews.ReviewId,
            Content: values.content,
            Rating: values.rating
        };

        await dispatch(updateReview(updatedReview));
        setIsEditMode(false);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
    };

    
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none'
    };

    return (
        <>
            <Card onClick={handleOpenModal} sx={{ 
                    width: '75%', 
                    mb: 2, 
                    cursor: 'pointer', 
                    '&:hover': { 
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
                        transform: 'scale(1.02)' 
                    },
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                }}>
                <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar src={reviews.ImgUrl || '/default-avatar.png'} sx={{ bgcolor: 'primary.main' }} />
                        <Typography variant="subtitle2" sx={{ ml: 2 }}>
                            {reviews.UserName}
                        </Typography>
                    </Box>
                    <Rating name="read-only-rating" value={reviews.Rating} precision={0.1} max={10} readOnly />
                    <Typography variant="body2" color="text.secondary">
                       
                        {format(new Date(reviews.ReviewDate), 'PPP')}
                    </Typography>
                    <Typography variant="body1" mt={2}>
                        {reviews.Content}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                    <Button startIcon={<ThumbUpIcon />} onClick={(event) => handleUpvote(event)}>
                        Upvote
                    </Button>
                        <Typography sx={{ ml: 1 }}>
                            {reviews.UpVotes} upvotes
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box sx={modalStyle}>
                    {isEditMode ? (
                        <Formik initialValues={{ content: reviews.Content, rating: reviews.Rating }} onSubmit={handleUpdate}>
                            {({  setFieldValue }) => (
                                <Form>
                                    <Field as={TextField} name="content" multiline fullWidth rows={4} />
                                    <StarRating
                                        onRatingChange={(value) => setFieldValue('rating', value)}
                                    />
                                    <Box mt={2}>
                                        <Button type="submit">Save</Button>
                                        <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <Typography variant="h6">{reviews.UserName}'s Review</Typography>
                            <Rating value={reviews.Rating} max={10} readOnly />
                            <Typography variant="body1" mt={2}>{reviews.Content}</Typography>
                            <Box display="flex" alignItems="center" mt={2}>
                                <Button startIcon={<ThumbUpIcon />} onClick={handleUpvote}>Upvote</Button>
                                {isAuthor && !isEditMode && (
                                    <>
                                        <Button onClick={() => setIsEditMode(true)} sx={{ ml: 1 }}>Edit</Button>
                                        <Button onClick={handleDelete} sx={{ ml: 1 }}>Delete</Button>
                                    </>
                                )}
                            </Box>
                        </>
                    )}
                    
                </Box>
            </Modal>
        </>
    );
}



export default Review;