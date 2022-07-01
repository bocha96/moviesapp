import { Container, Divider, FormControl, InputBase, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import MoviesList from '../components/MoviesList';
import RatingFilter from '../components/RatingFilter';
import TrendingMovies from '../components/TrendingMovies';

const API_DISCOVER = 'https://api.themoviedb.org/3/discover/movie?api_key=958d0d771dc33ca589ba5e00a5322c8c&sort_by=popularity.desc&include_adult=false';
const HOME_BG = 'https://r4.wallpaperflare.com/wallpaper/799/482/390/the-batman-2021-batman-red-4k-superhero-hd-wallpaper-78768d7840805c98e09ce1fe2872e4ba.jpg';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch(API_DISCOVER)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
            })
    }, []);

    useEffect(() => {
        if (rating && rating !== 0) {
            setFilteredMovies(movies.filter(movie => movie.vote_average > (rating * 2) - 2 && movie.vote_average < (rating * 2)))
        } else {
            setFilteredMovies(null)
        }
    }, [rating, movies])

    const searchMovie = async (e) => {
        e.preventDefault();
        if (query && query.match(/[a-zA-Z0-9]/)) {
            try {
                const url = `https://api.themoviedb.org/3/search/movie?api_key=958d0d771dc33ca589ba5e00a5322c8c&query=${query}`;
                const res = await fetch(url);
                const data = await res.json();
                setMovies(data.results);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const searchHandler = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <Container sx={{
                backgroundImage: `url(${HOME_BG})`,
                opacity: 0.9,
                backgroundSize: 'cover',
                height: 500,
                color: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',

            }} maxWidth='xl'>
                <Container sx={{ textAlign: 'center' }}>
                    <Typography variant='h3'>Welcome to Movies.app</Typography>
                    <Typography variant='h6'>Where you search a movie and find out what's going on</Typography>
                    <form onSubmit={searchMovie}>
                        <FormControl sx={{ mt: 8 }}>
                            <InputBase
                                sx={{ backgroundColor: '#fff', width: 500, borderRadius: 25, pl: 3, pt: 1, pb: 1 }}
                                variant='outlined'
                                placeholder='Search a movie...'
                                id='searchField'
                                value={query}
                                onChange={searchHandler}>
                            </InputBase>
                        </FormControl>
                    </form>
                    <RatingFilter rating={rating} setRating={setRating} />
                </Container>
            </Container>
            <Container fixed sx={{ textAlign: 'center', pt: 3, pb: 5, backgroundColor: '#ecebe9' }} maxWidth='xl'>
                {filteredMovies ? (
                    <>
                        <Divider sx={{ mt: 3, mb: 5 }}>
                            <Typography variant='h5'>Results</Typography>
                        </Divider>
                        <MoviesList movies={filteredMovies} />
                    </>
                ) : (
                    <>
                        <Divider sx={{ mt: 3, mb: 5 }}>
                            <Typography variant='h5'>Discover</Typography>
                        </Divider>
                        <MoviesList movies={movies} />
                    </>
                )}
            </Container>
            <TrendingMovies />
            <Footer></Footer>
        </>
    )
}

export default Home;