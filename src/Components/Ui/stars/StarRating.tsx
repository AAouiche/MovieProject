import { Rating, Typography } from "@mui/material";
import { useState } from "react";

export default function StarRating() {
    
  
    return (
        <div>
        <Typography component="legend">Rating</Typography>
        <Rating name="rating"   size="large"  max={10} precision={0.1}/>
        </div>
    );
  }
  