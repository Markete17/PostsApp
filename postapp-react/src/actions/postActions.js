import axios from 'axios'
import { SET_USER_POSTS } from './types'
import { USER_POSTS_ENDPOINT } from '../helpers/endpoints'

export const getUserPosts = () => dispatch => {
    return new Promise((resolve,reject) =>{
        axios.get(USER_POSTS_ENDPOINT)
            .then(response => {
                dispatch(
                    {
                        type: SET_USER_POSTS,
                        payload: {loaded:true, posts:response.data}
                    }
                )
            
                resolve(response)
           
            }).catch(e =>{
                reject(e)
            })
            
    })
}