import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
    loggedIn: localStorage.getItem('loggedIn') === null ? false : true, 
    user: JSON.parse(localStorage.getItem('user')) === null ? {} : JSON.parse(localStorage.getItem('user'))
}

export default function authReducer(state = initialState, action){
    const {type,payload} = action;

    switch(type){
        case SET_CURRENT_USER:
            return {
                ...state,
                loggedIn: payload.loggedIn,
                user: payload.user
            }
        default:
            return state
    }
}