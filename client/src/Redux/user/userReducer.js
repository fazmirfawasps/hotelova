import { hostApplied, Logout, setCheckuser, setHost, setUser } from './userType'

const initialstate = {
    userDetails: {name:'fazmir fawas'},
    isLoggedin: true,
    Checkuserornot: false,
    ishosted: false,
    jwttoken: 'true',
    hostApplied: false,
}

const userReducer = (state = initialstate, action) => {
    switch (action.type) {
        case setUser:
            return {
                ...state,
                userDetails: action.payload.userDetails,
                isLoggedin: true,
            }
        case setCheckuser:
            return {
                ...state,
                Checkuserornot: action.payload,
            }
        case setHost:
            return {
                ...state,
                ishosted: true,
            }
        case Logout:
            return { initialstate }

        case hostApplied:
            return {
                ...state,
                hostApplied: true,
            }
        default:
            return state
    }
}

export default userReducer
