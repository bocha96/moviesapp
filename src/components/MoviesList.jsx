import { Box, Container, ImageList, ImageListItem, Modal, Rating, Typography } from '@mui/material';
import { display } from '@mui/system';
import React, { useState } from 'react';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';




const MoviesList = (props) => {
    const { movies } = props;

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [modalMovie, setModalMovie] = useState(movies[0]);

    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows
                }&fit=crop&auto=format&dpr=2 5x`,
        };
    }
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 500,
        border: '2px solid #eee',
        boxShadow: 24,
        p: 4,
        color: '#eee',
        display: 'flex',
        p: 0,
        overflow: 'auto'
    }
    return (
        movies.length > 0 ? (<Container>
            <ImageList
                sx={{ width: 1080 }}
                cols={6}
                gap={10}>

                {movies.map((movie, index) => {
                    const cols = index === 0 ? 2 : 1;
                    const rows = index === 0 ? 2 : 1;


                    return (
                        <ImageListItem key={index} cols={cols} rows={rows}>
                            {movie.poster_path ? (
                                <img
                                    {...srcset(IMG_URL + movie.poster_path, 250, 200, rows, cols)}
                                    loading='lazy'
                                    alt={movie.title}
                                    onClick={() => {
                                        setModalMovie(movie);
                                        setOpen(true)
                                    }} />) : (
                                <Box sx={{
                                    width: 171,
                                    height: 257,
                                    backgroundColor: 'primary.dark'
                                }} onClick={() => {
                                    setModalMovie(movie);
                                    setOpen(true)
                                }} p={1}>
                                    <Typography sx={{ color: '#eee' }} variant='subtitle2'>{movie.title}</Typography>
                                </Box>
                            )}
                        </ImageListItem>
                    )
                })}
            </ImageList>
            {open && <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description">
                <Box sx={modalStyle}>
                    {modalMovie.poster_path ? (
                        <Container sx={{
                            background: `url(${IMG_URL + modalMovie.poster_path})center fixed`,
                            backgroundSize: 'cover',
                            filter: 'brightness(50%)',
                            position: 'relative'
                        }} p={3}>
                        </Container>) : (
                        <Box sx={{
                            width: 400,
                            height: 452,
                            backgroundColor: 'primary.dark',
                            position: 'relative'
                        }} p={3}>
                        </Box>
                    )}
                    <Box sx={{ position: 'absolute' }} p={3}>
                        <Typography variant="subtitle2" component="h3" >
                            {modalMovie.release_date}
                        </Typography>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {modalMovie.title}
                        </Typography>
                        <Typography variant="subtitle2" component="h3">
                            <Rating name="voteAvg" value={Math.floor(modalMovie.vote_average / 2)} readOnly max={5} />
                            {modalMovie.vote_average}
                        </Typography>

                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            {modalMovie.overview}
                        </Typography>
                    </Box>
                </Box>
            </Modal>}
        </Container>) : (
            <Container sx={{ textAlign: 'center', mt: 10 }}>

                <Typography variant='h2'> Oops! We can't find any movie. </Typography>
            </Container>
        )
    )
}

export default MoviesList;