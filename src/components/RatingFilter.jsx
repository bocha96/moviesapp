import { Box, Rating, Typography } from '@mui/material';
import React from 'react';


const RatingFilter = (props) => {
    const { rating, setRating } = props;

    return (
        <Box sx={{
            mt: 5,
            backgroundColor: '#fff',
            borderRadius: 3,
            height: 100,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            ml: 'auto',
            mr: 'auto',
            p: 1
        }}>
            <Typography variant='subtitle2' component='p' sx={{ color: '#aaa', m: 2 }}>Filter by rating</Typography>
            <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} size='large' />
        </Box >
    )
}

export default RatingFilter;