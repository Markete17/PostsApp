import React from 'react'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { useDispatch } from 'react-redux'
import { getUserPosts } from '../actions/postActions'
import axios from 'axios'
import { toast } from 'react-toastify';
import { DELETE_POST_ENDPOINT } from '../helpers/endpoints'

const DeletePostButton = ({postId, title}) => {
    const dispatch = useDispatch()

    const createAlert = () => {
        //https://www.npmjs.com/package/react-confirm-alert
        confirmAlert({
            title: "Delete post",
            message: "Surely you want to delete the post: '"+title+"'",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {deletePost()}
                 },
                 {
                    label: 'No',
                    onClick: () => {return false}
                }
            ]
        })
    }

    const deletePost = async () => {
        try {
            await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`)
            await dispatch(getUserPosts())
    
            toast.info("Post deleted!",
            {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:2000
            }
          )
        } catch (error) {
            toast.error(error.response.data.message,{position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }

    }

  return (
    <Button variant="danger" size="sm" onClick={() => createAlert()}>Delete</Button>
  )
}

export default DeletePostButton