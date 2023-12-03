import { Typography, Container, Grid } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    deleteWishlist,
    getWishlist,
    postwishlist,
    viewAllProduct,
} from '../api/api'
import ProductCard1 from '../component/ProductCard1'
import Banner from '../layouts/Navbar/Banner'
import { useDispatch, useSelector } from 'react-redux'
import {
    AddProperties,
    addfavourite,
    toInitialState,
} from '../Redux/properties/propertiesAction'
import { Box } from '@mui/system'
import { addSingleProperty } from '../Redux/singleProperty/singlePropAction'
import { useNavigate } from 'react-router-dom'
import {
    addtowishlist,
    removefromwishlist,
} from '../Redux/wishlist/wishlistAction'
import { addallwishlist } from '../Redux/wishlist/wishlistAction'
import { useContext } from 'react'
import { ExternalContext } from '../context/CustomContext'
import Scrollloading from '../pages/Scrollloading'
function Home() {
    const dispatch = useDispatch()
    const naviagate = useNavigate()
    const userid = useSelector((state) => state.user.userDetails?._id)
    const userlogged = useSelector((state) => state.user.isLoggedin)
    const [Loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [isTheEnd, setIsTheEnd] = useState(false)
    const { setOpenlogin, setShowErr } = useContext(ExternalContext)
    const intObserver = useRef()
    const Skeleton = Array.from({ length: 4 })

    useEffect(() => {
        dispatch(toInitialState())
        setPage(0)
        setIsTheEnd(true)
    }, [userlogged])

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        const fetchProduct = async () => {
            try {
                const { data } = await viewAllProduct(4, page)
                setIsTheEnd(data.length > 0)
                dispatch(AddProperties(data))
                setLoading(false)
            } catch (err) {
                setShowErr(true)
            }
        }
        fetchProduct()

        return () => controller.abort()
    }, [userlogged, page])

    const Property = useSelector((state) => state.properties?.propertyArray)

    useEffect(() => {
        if (userlogged) {
            const fetchWishlist = async () => {
                try {
                    const { data } = await getWishlist(userid)
                    dispatch(addallwishlist(data))
                } catch (err) {
                    setShowErr(true)
                }
            }
            fetchWishlist()
        }
    }, [userlogged])

    const lastPostRef = useCallback(
        (post) => {
            if (Loading) return

            if (intObserver.current) intObserver.current.disconnect()

            intObserver.current = new IntersectionObserver((posts) => {
                console.log()
                if (posts[0].isIntersecting && isTheEnd) {
                    setPage((prev) => prev + 1)
                }
            })

            if (post) intObserver.current.observe(post)
        },
        [Loading]
    )

    const wishlist = useSelector((state) => state.wishlist?.wishlistArray)

    function addWishlist() {
        wishlist?.forEach((item) => {
            let index = Property.findIndex((prop) => prop._id === item?._id)
            if (index != -1) {
                Property[index].wishlist = true
            }
        })
    }
    if (userlogged) {
        addWishlist()
    }


    function navigetTosinglepage(id) {
        let singleProperty = Property.find((item) => item._id == id)
        dispatch(addSingleProperty(singleProperty))
        naviagate('/propertyDetail')
    }

    async function addtofavourite(property) {
        if (userlogged) {
            try {
                await postwishlist(userid, property._id)
                dispatch(addfavourite(property._id))
                dispatch(addtowishlist(property))
            } catch (err) {
                setShowErr(true)
            }
        } else {
            setOpenlogin(true)
        }
    }

    async function removeFromWishlist(id) {
        if (userlogged) {
            try {
                await deleteWishlist(userid, id)
                dispatch(addfavourite(id))
                dispatch(removefromwishlist(id))
            } catch (err) {
                setShowErr(true)
            }
        }
    }

    function Card() {
        const result = Property.map((item, index, arr) => {
            const ref = arr.length === index + 1 ? lastPostRef : null
            return (
                <ProductCard1
                    key={index}
                    property={item}
                    callback={navigetTosinglepage}
                    addtowishlist={addtofavourite}
                    removeFromWishlist={removeFromWishlist}
                    wishlist={true}
                    ref={ref}
                    size={3}
                />
            )
        })
        return result
    }

    return (
        <Box>
              <>
                    <Banner />
                    <Container
                        maxWidth="xl"
                        sx={{
                            width: '94%',
                        }}
                    >
                        <Typography pt={2} pb={2} color="primary" variant="h4">
                            Looking for the perfect stay?
                        </Typography>
                        <Grid container>
                            <Card />
                            {Loading ? (
                                <Scrollloading
                                    size={3}
                                    numberofskelton={Skeleton}
                                />
                            ) : null}
                        </Grid>
                    </Container>
                </>
            
           
        </Box>
    )
}

export default Home
