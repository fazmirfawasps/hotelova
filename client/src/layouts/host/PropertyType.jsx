import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography, TextField, Autocomplete } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getRoomType } from '../../api/api'

function PropertyType() {
    const { control, formState, setValue, getValues } = useFormContext()
    const { errors } = formState
    const [data, setData] = useState([])
    useEffect(() => {
        getRoomType()
            .then(({ data }) => {
                setData(data)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    const [inputValue, setInputValue] = useState(getValues('Address'))
    const [suggestions, setSuggestions] = useState([])

    const ITEM_HEIGHT = 45
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    const handleAddress = async (event) => {
        setInputValue(event.target.value)
        setInputValue(event.target.value)
        setValue('Address', event.target.value)
        setValue('coordinates.lat', '123')
        setValue('coordinates.log', '123')
        setSuggestions([])
       
    }

    const [RoomType, setRoomType] = React.useState('')
    const handleChange = (event) => {
        console.log(event.target.value)
        setRoomType(event.target.value)
    }

    return (
        <Box component="div" sx={{ minHeight: '50vh' }}>
            <Typography variant="h4" m={1} maxWidth={350} ml={5}>
                What kind of place will you host?
            </Typography>
            <Stack direction={'column'} pl={5} spacing={3}>
                <FormControl error={Boolean(errors.RoomType)} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        RoomType
                    </InputLabel>
                    <Controller
                        control={control}
                        name="RoomType"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={RoomType}
                                label="RoomType"
                                onChange={handleChange}
                                sx={{ maxHeight: 80 }}
                                MenuProps={MenuProps}
                                {...field}
                            >
                                {data.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.RoomType}
                                    >
                                        <Stack direction={'row'} spacing={2}>
                                            <img
                                                width={80}
                                                src={item.image}
                                                alt="text"
                                            />{' '}
                                            <Typography
                                                varient="h4"
                                                textAlign={'center'}
                                            >
                                                {'   ' + item.RoomType}
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.RoomType && (
                        <Typography variant="caption" color={'red'}>
                            Select an option
                        </Typography>
                    )}
                </FormControl>

                <Controller
                    control={control}
                    name="Address"
                    rules={{ required: 'location required' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Autocomplete
                                id="combo-box-demo"
                                options={suggestions}
                                inputValue={inputValue}
                                {...field}
                               
                                onInputChange={handleAddress}
                                getOptionLabel={(option) =>
                                    option.place_name ? option.place_name : ''
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Enter location"
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props}>{option.place_name}</li>
                                )}
                            />
                            {error && (
                                <Typography
                                    m={0}
                                    variant="caption"
                                    color={'red'}
                                >
                                    {error.message}{' '}
                                </Typography>
                            )}
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="Price"
                    rules={{ required: true, pattern: /^\d+$/ }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Price per night"
                            error={Boolean(errors.Price)}
                            helperText={errors.Price && 'Price is required'}
                            id="fullWidth"
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="Maxguest"
                    rules={{ required: true, pattern: /^\d+$/ }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Max number of guest"
                            error={Boolean(errors.Maxguest)}
                            helperText={
                                errors.Maxguest && 'Max guest is required'
                            }
                            id="fullWidth"
                            {...field}
                        />
                    )}
                />
            </Stack>
        </Box>
    )
}

export default PropertyType
