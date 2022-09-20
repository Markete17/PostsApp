import React,{useState,useEffect} from 'react'
import { POSTS_ENDPOINT } from '../helpers/endpoints'
import axios from 'axios'
import Post from './Post'
import Loading from '../utils/Loading'

const Posts = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    axios.get(POSTS_ENDPOINT).then(
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
        Last public posts
        </h1>
       {loading ?<Loading></Loading> :
       <div>
          {posts.map(post => 
            <Post key={post.postId} post={post}></Post>
          )}
        </div>}

    </div>
  )
}

export default Posts