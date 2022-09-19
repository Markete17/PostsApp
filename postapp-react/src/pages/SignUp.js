import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Card,Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import { registerUser,loginUser } from '../actions/authActions'
import { useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'


const SignUp = () => {

  const [errors,setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const navigate = useNavigate()

  useEffect(() =>{
    if(loggedIn) {
      navigate("/");
    }
  })

  const register = (firstName, lastName, email,password) => {
    const errors = {}
    
    
    if(!validator.isEmail(email) || validator.isEmpty(email)){
      errors.email = 'Invalid email.'
    }

    if(!validator.isLength(password,{min: 8, max:30})){
      errors.password = 'the password must be between 8 and 30 characters long.'
    }

    if(validator.isEmpty(firstName)){
        errors.firstName = 'First Name cannot be empty.'
    }
    if(validator.isEmpty(lastName)){
        errors.lastName = 'Last Name cannot be empty.'
    }

    //Si hay errores en el formulario, lanzar errores y no se loguea
    if(!isObjectEmpty(errors)){
      setErrors(errors);
      return
    }

    // Llamar a la funcion login de actions
    dispatch(registerUser({firstName, lastName, email,password}))
    .then(response =>{
        setErrors({})
        dispatch(loginUser({email,password}))
    }).catch(err =>{
        console.log(err)
        setErrors({email:"Invalid email", register: err.response.data.errorMessage})
    })

  }

  return (
    <Container className='mt-4'>
      <Row>
        <Col sm="12" md={{span:8,offset:2}} lg={{span:6,offset:3}}>
          <Card className='d-flex justify-content-center' body>
            {errors.register && <Alert variant='danger'>{errors.register}</Alert>}
              <h3 className='text-center'>Register</h3>
              <hr></hr>
              <SignUpForm errors={errors} onSubmitCallback={register}></SignUpForm>
              <div className='mt-4 text-center'>
                  <Link to={"/signin"}>Do you have account? Sign in here!</Link>
              </div>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default SignUp