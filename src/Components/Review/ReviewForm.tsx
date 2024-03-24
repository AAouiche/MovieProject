import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/Slices/MovieReviewSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { MovieReview } from "../../models/MovieReview";
import StarRating from "../Ui/stars/StarRating";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

interface MovieFormProps {
    movieId: string;
    
}

interface FormValues {
    reviewText: string;
    rating: number;
}

const AddReviewForm = ({ movieId }: MovieFormProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const ReviewSchema = Yup.object().shape({
        reviewText: Yup.string().required('Review content is required'),
        rating: Yup.number().min(1, 'Rating must be between 1 and 10').max(10, 'Rating must be between 1 and 10').required('Rating is required'),
    });

    const initialValues: FormValues = {
        reviewText: '',
        rating: 0,
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={ReviewSchema}
                onSubmit={(values, actions) => {
                    const newReview: MovieReview = {
                        ReviewId: 0,
                        imdbID: movieId,
                        Content: values.reviewText,
                        Rating: values.rating,
                        ReviewDate: new Date(),
                        UpVotes: 0,
                        UserName: ""

                    };

                    dispatch(createReview(newReview));
                    actions.resetForm();
                }}
            >
                {({ setFieldValue, errors, touched }) => (
                    <Form>
                        <Field name="reviewText" as="textarea" placeholder="Write a review..." />
                        {errors.reviewText && touched.reviewText ? <div>{errors.reviewText}</div> : null}

                        <StarRating 
                            onRatingChange={(value) => setFieldValue('rating', value)}
                        />
                        {errors.rating && touched.rating ? <div>{errors.rating}</div> : null}

                        <button className="generic-button" type="submit">Submit Review</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddReviewForm;