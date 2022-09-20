import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const SignInForm = ({errors, onSubmitCallback}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback(email,password);
    }

  return (
    <Form onSubmit={submitForm}>
        <Form.Group control='email' className='mt-3'>
            <Form.Label className='d-flex justify-content-center'><b>Email</b></Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={ e=> {setEmail(e.target.value);errors.email=null}}
                placeholder='Email'
                isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
                {errors.email}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group control='password' className='mt-3'>
            <Form.Label className='d-flex justify-content-center'><b>Password</b></Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={ e=> {setPassword(e.target.value);errors.password=null }}
                placeholder='Password'
                isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid">
                {errors.password}
            </Form.Control.Feedback>
        </Form.Group>
        <div className="col-md-12 text-center">
        <Button className="mt-4 mx-auto" variant='primary' type='submit'>Sign In</Button>
        </div>
    </Form>
  )
}

export default SignInForm