import React,{useState,useEffect} from 'react'
import Post from './Post'
import Loading from '../utils/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../actions/postActions'
import { toast } from 'react-toastify'
import NoPosts from '../utils/NoPosts'

const UserPosts = () => {

  const [loading, setLoading] = useState(null)
  const loaded = useSelector(state => state.posts.loaded)
  const posts = useSelector(state => state.posts.posts)

  const dispatch = useDispatch()

  useEffect(() =>{
    async function fetchedPosts() {
        if(!loaded){
          try{
            setLoading(true);
            await dispatch(getUserPosts())
            setLoading(false)
          } catch(e){
            toast.error(e.response.data.message,{position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000})
          }
        } else {
          setLoading(false)
        }
    }
    fetchedPosts()
  }, [dispatch,loaded])
  


  return (
    <div>
        <h1 className='mt-4 h-50 p-4 text-white bg-primary rounded-3 text-center'>
        My posts
        </h1>
        {loading && <Loading></Loading>}
        {!loading && posts.length===0 
        ? <NoPosts text={"There are not available private posts"}></NoPosts>
        : 
        <div>
        {posts.map(post => 
          <Post key={post.postId} post={post} renderControls={true}></Post>
        )}
      </div>}
    </div>
  )
}

export default UserPosts