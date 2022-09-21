import { SET_USER_POSTS } from "../actions/types";

const initialState = {
    posts:[],
    loaded:false
}

export default function userPostReducer(state = initialState, action){
    const {type,payload} = action;

    switch(type){
        case SET_USER_POSTS:
            return {
                ...state,
                loaded: payload.loaded,
                posts: payload.posts
            }
        default:
            return state
    }
}