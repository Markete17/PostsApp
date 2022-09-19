import React, {useEffect, useState} from 'react'
import SignInForm from '../components/SignInForm'
import { Container, Row, Col, Card,Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import { loginUser } from '../actions/authActions'
import { useNavigate } from 'react-router-dom'


const Signin = () => {

  const [errors,setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const navigate = useNavigate()

  useEffect(() =>{
    if(loggedIn) {
      navigate("/");
    }
  })

  const login = (email,password) => {
    const errors = {}
    
    
    if(!validator.isEmail(email) || validator.isEmpty(email)){
      errors.email = 'Invalid email.'
    }

    if(validator.isEmpty(password)){
      errors.password = 'The password cannot be empty.'
    }
    //Si hay errores en el formulario, lanzar errores y no se loguea
    if(!isObjectEmpty(errors)){
      setErrors(errors);
      return
    }
    // Llamar a la funcion login de actions
    dispatch(loginUser({email,password}))
    .then(response =>{
      setErrors({})
    }).catch(err =>{
      setErrors({auth: "Incorrect email or password"})
    })

  }

  return (
    <Container className='mt-4'>
      <Row>
        <Col sm="12" md={{span:8,offset:2}} lg={{span:6,offset:3}}>
          <Card className='d-flex justify-content-center' body>
            {errors.auth && <Alert variant='danger'>{errors.auth}</Alert>}
              <h3 className='text-center'>Sign In</h3>
              <hr></hr>
              <SignInForm errors={errors} onSubmitCallback={login}></SignInForm>
              <div className='mt-4 text-center'>
                  <Link to={"/signup"}>Do not have account? Register here!</Link>
              </div>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default Signin