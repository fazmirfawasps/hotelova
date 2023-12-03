import React from 'react'
import { Box } from '@mui/material/'

function Banner() {
    return (
        <Box
            sx={{
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                backgroundImage:
                    'url("https://vastphotos.com/files/uploads/photos/10114/new-york-city-sunrise-skyline-l.jpg?v=20220712073521")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        ></Box>
    )
}

export default Banner
