import { Box, Container, IconButton, Link, Typography } from '@mui/material'
import React from 'react'
import { GitHub, LinkedIn } from '@mui/icons-material'

const Footer = () => {
    return (
        <Container
            sx={{
                background: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: 100
            }}
            maxWidth='xl'>
            <Box>
                <Typography variant='subtitle1' component='p' sx={{ color: '#eee', mt: 1 }}>Made by Julián Viso</Typography>
                <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label='github'>
                        <Link href='https://github.com/bocha96' target="_blank" rel="noopener noreferrer">
                            <GitHub htmlColor='#eee' />
                        </Link>
                    </IconButton>
                    <IconButton aria-label='linked-in'>
                        <Link href='https://linkedin.com/in/julian-viso/' target="_blank" rel="noopener noreferrer">
                            <LinkedIn htmlColor='#eee' />
                        </Link>
                    </IconButton>

                </Box>
            </Box>
        </Container>
    )
}

export default Footer