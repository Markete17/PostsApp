import React, {useState,useEffect} from 'react'
import { Container, Row, Col, Card,Alert } from 'react-bootstrap'
import validator from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import NewPostForm from '../components/NewPostForm'
import { exposures } from '../helpers/exposures'
import axios from 'axios'
import { UPDATE_POST_ENDPOINT } from '../helpers/endpoints'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getUserPosts } from '../actions/postActions'
import { useDispatch } from 'react-redux'
import { POSTS_DETAILS_ENDPOINT } from '../helpers/endpoints'

const EditPost = () => {

  const {id} = useParams();
  const [errors,setErrors] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [post,setPost] = useState(null)

  useEffect(() =>{
    axios.get(`${POSTS_DETAILS_ENDPOINT}/${id}`).then(
      response => {
        setPost(response.data)
      }
    ).catch(error =>{
        navigate.push('/')
    })
  }, [id,navigate])

  const editPost = async(title,content,expirationTime,exposureId) => {
    const errors = {}

    if(validator.isEmpty(title)){
      errors.title = 'The title cannot be empty.'
    }
    if(validator.isEmpty(content)){
        errors.content = 'The content cannot be empty.'
    }
    //Si hay errores en el formulario, lanzar errores y no se loguea
    if(!isObjectEmpty(errors)){
      setErrors(errors);
      return
    }
    expirationTime = parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime

    try {
      const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post.postId}`,{title,content,expirationTime,exposureId})
      await dispatch(getUserPosts())
      navigate(`/post/${response.data.postId}`)
      toast.info("Post updated!",
        {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:2000
        }
      )
    } catch(e) {
      setErrors({editpost: e.response.data.message})
    }

  }

  return (
    <Container className='mt-4 mb-5'>
      <Row>
        <Col sm="12" md={{span:10,offset:1}} lg={{span:10,offset:1}}>
          <Card className='d-flex justify-content-center' body>
            {errors.newpost && <Alert variant='danger'>{errors.newpost}</Alert>}
              <h3 className='text-center'>Edit Post</h3>
              <hr></hr>
            {post && <NewPostForm 
                errors={errors} 
                onSubmitCallback={editPost}
                pTitle={post.title}
                pContent={post.content}
                pExposureId={post.exposure.id}
                pExpirationTime={post.expiresAt}
                textButton="Edit"
                >
                    
                </NewPostForm>}
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default EditPost