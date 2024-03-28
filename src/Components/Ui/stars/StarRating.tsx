import { Rating, Typography } from "@mui/material";
import { useState } from "react";

interface StarRatingProps {
    onRatingChange: (value: number) => void;
}

export default function StarRating({ onRatingChange }: StarRatingProps) {
    const [rating, setRating] = useState(1);

    const handleRatingChange = (_: unknown, newValue: number | null) => {
        
        const updatedRating = newValue ? Math.max(newValue, 1) : 1;
        setRating(updatedRating);
        onRatingChange(updatedRating);
    };

    return (
        <div>
            <Typography component="legend">Rating</Typography>
            <Rating name="rating" size="large" max={10} precision={1} onChange={handleRatingChange} value={rating}/>
        </div>
    );
}