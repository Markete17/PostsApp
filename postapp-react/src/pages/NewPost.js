import React, {useState} from 'react'
import { Container, Row, Col, Card,Alert } from 'react-bootstrap'
import validator from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import NewPostForm from '../components/NewPostForm'
import { exposures } from '../helpers/exposures'
import axios from 'axios'
import { CREATE_POST_ENDPOINT } from '../helpers/endpoints'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const NewPost = () => {

  const [errors,setErrors] = useState({});

  const navigate = useNavigate()

  const createPost = (title,content,expirationTime,exposureId) => {
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
    expirationTime = exposureId == exposures.PRIVATE ? 0 : expirationTime

    
    axios.post(CREATE_POST_ENDPOINT,{title,content,expirationTime,exposureId})
    .then(response =>{
        navigate(`/post/${response.data.postId}`)
        toast.info("Post created!",
                                {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose:2000
                                })
    }).catch(e => {
        setErrors({newpost: e.response.data.message})
    })

  }

  return (
    <Container className='mt-4 mb-5'>
      <Row>
        <Col sm="12" md={{span:10,offset:1}} lg={{span:10,offset:1}}>
          <Card className='d-flex justify-content-center' body>
            {errors.newpost && <Alert variant='danger'>{errors.newpost}</Alert>}
              <h3 className='text-center'>Create Post</h3>
              <hr></hr>
              <NewPostForm errors={errors} onSubmitCallback={createPost}></NewPostForm>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default NewPost