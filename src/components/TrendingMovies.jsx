import { Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoviesList from './MoviesList'

const API_TRENDING = 'https://api.themoviedb.org/3/trending/movie/week?api_key=958d0d771dc33ca589ba5e00a5322c8c'

const TrendingMovies = () => {
    const [trendingMovies, setTrending] = useState([]);

    useEffect(() => {
        fetch(API_TRENDING)
            .then(res => res.json())
            .then(data => {
                setTrending(data.results);
            })
    }, []);

    return (
        <Container sx={{ textAlign: 'center' }} maxWidth='xl'>
            <Divider sx={{ m: 3 }}>
                <Typography variant='h5'>Trends this week</Typography>
            </Divider>
            <MoviesList movies={trendingMovies.slice(11)} />
        </Container>
    )
}

export default TrendingMovies