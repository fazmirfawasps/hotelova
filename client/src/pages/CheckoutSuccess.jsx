import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

import { Box, Typography } from '@mui/material'

function CheckoutSuccess() {
    let player = useRef(null)

    return (
        <Box mt={15}>
            <>
                <Player
                    ref={player}
                    autoplay={true}
                    controls={true}
                    src={
                        'https://assets1.lottiefiles.com/packages/lf20_atippmse.json'
                    }
                    style={{ height: '300px', width: '300px' }}
                    direction={1000}
                    keepLastFrame={true}
                />
                <Typography
                    mt={2}
                    color={'green'}
                    textAlign={'center'}
                    variant="h2"
                >
                    Booking being confirmed
                </Typography>
            </>
        </Box>
    )
}

export default CheckoutSuccess
