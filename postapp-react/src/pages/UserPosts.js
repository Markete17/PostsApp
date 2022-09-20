import React,{useState,useEffect} from 'react'
import {USER_POSTS_ENDPOINT } from '../helpers/endpoints'
import axios from 'axios'
import Post from './Post'
import Loading from '../utils/Loading'

const UserPosts = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    axios.get(USER_POSTS_ENDPOINT).then(
      response => {
        setPosts(response.data)
        setLoading(false)
      }
    ).catch(error =>{
      console.log(error)
      setLoading(false)
    })
  }, [])
  


  return (
    <div>
        <h1 className='mt-4 h-50 p-4 text-white bg-primary rounded-3 text-center'>
        My posts
        </h1>
        {loading ?<Loading></Loading> :
         <div>
         {posts.map(post => 
           <Post key={post.postId} post={post} renderControls={true}></Post>
         )}
       </div>}

    </div>
  )
}

export default UserPosts