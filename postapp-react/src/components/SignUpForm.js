import React, {useState} from 'react'
import {Form, Button, Col, Row} from 'react-bootstrap'

const SignUpForm = ({errors, onSubmitCallback}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback(firstName, lastName, email, password);
    }

  return (
    <Form onSubmit={submitForm}>

        <Row>
            <Col md="6" xs="12">
            <Form.Group control='name' className='mt-3'>
                <Form.Label className='d-flex justify-content-center'><b>First Name</b></Form.Label>
                <Form.Control
                    type="text"
                    value={firstName}
                    onChange={ e=> setFirstName(e.target.value) }
                    placeholder='First Name'
                    isInvalid={errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col md="6" xs="12">
            <Form.Group control='name' className='mt-3'>
                <Form.Label className='d-flex justify-content-center'><b>Last Name</b></Form.Label>
                <Form.Control
                    type="text"
                    value={lastName}
                    onChange={ e=> setLastName(e.target.value) }
                    placeholder='First Name'
                    isInvalid={errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>
            </Col>
        </Row>


        <Form.Group control='email' className='mt-3'>
            <Form.Label className='d-flex justify-content-center'><b>Email</b></Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={ e=> setEmail(e.target.value) }
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
                onChange={ e=> setPassword(e.target.value) }
                placeholder='Password'
                isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid">
                {errors.password}
            </Form.Control.Feedback>
        </Form.Group>
        <div className="col-md-12 text-center">
        <Button className="mt-4 mx-auto" variant='primary' type='submit'>Register</Button>
        </div>
    </Form>
  )
}

export default SignUpForm