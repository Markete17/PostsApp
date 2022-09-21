import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { exposures } from '../helpers/exposures';
import moment from 'moment';


const NewPostForm = ({errors, onSubmitCallback,pTitle="",pContent="",pExposureId=exposures.PUBLIC,pExpirationTime=60, textButton= "Create"}) => {
    
    

    const [title,setTitle] = useState(pTitle);
    const [content,setContent] = useState(pContent);
    const [expirationTime,setExpirationTime] = useState(pExpirationTime);
    const [exposureId,setExposureId] = useState(pExposureId);

    useEffect(() =>{
        const formatDate = () => {
            if(pExpirationTime!==60){
                const min = - (moment().diff(pExpirationTime, 'minutes') -1)
                setExpirationTime(min)
            }
        }
        formatDate()
      }, [pExpirationTime])
    

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback(title,content, expirationTime, exposureId);
    }

  return (
    <Form onSubmit={submitForm}>
        <Form.Group control='title' className='my-3'>
            <Form.Label className='d-flex justify-content-center'><b>Title</b></Form.Label>
            <Form.Control
                type="text"
                value={title}
                onChange={ e=> {setTitle(e.target.value);errors.title=null }}
                placeholder='e.g. Snipped Array Java'
                isInvalid={errors.title}
            />
            <Form.Control.Feedback type="invalid">
                {errors.title}
            </Form.Control.Feedback>
        </Form.Group>

        <Row>
            <Col md="6" xs="12">
                <Form.Group controlId='expirationTime'>
                <Form.Label className='d-flex justify-content-center'><b>Expiration Time</b></Form.Label>
                <Form.Control 
                    as='select' 
                    value={expirationTime} 
                    onChange={ e => setExpirationTime(e.target.value)}
                    disabled={parseInt(exposureId) === exposures.PRIVATE}
                    >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="360">6 hours</option>
                    <option value="360">12 hours</option>
                    <option value="1440">1 day</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.expirationTime}
                </Form.Control.Feedback>
            </Form.Group>
            </Col>

            <Col md="6" xs="12">
                <Form.Group controlId='exposureId'>
                <Form.Label className='d-flex justify-content-center'><b>Post Type</b></Form.Label>
                <div className='text-center'>
                    <Form.Check 
                        onChange={e => setExposureId(e.target.value)}
                        checked={parseInt(exposureId) === exposures.PRIVATE}
                        value={exposures.PRIVATE} 
                        inline 
                        label='Private' 
                        name="exposureId" 
                        type="radio"
                    >

                    </Form.Check>

                    <Form.Check 
                        onChange={e => setExposureId(e.target.value)}
                        checked={parseInt(exposureId) === exposures.PUBLIC}
                        value={exposures.PUBLIC} 
                        inline 
                        label='Public' 
                        name="exposureId" 
                        type="radio"
                    >

                    </Form.Check>
                </div>
            </Form.Group>
            </Col>
        </Row>

        <Form.Group control='content' className='my-3'>
            <Form.Label className='d-flex justify-content-center'><b>Content</b></Form.Label>
            <Form.Control
                as="textarea"
                rows={10}
                value={content}
                onChange={ e=> {setContent(e.target.value);errors.content=null}}
                isInvalid={errors.content}
            />
            <Form.Control.Feedback type="invalid">
                {errors.content}
            </Form.Control.Feedback>
        </Form.Group>

        <div className="col-md-12 text-center">
        <Button className="mt-4 mx-auto" variant='primary' type='submit'>{textButton}</Button>
        </div>
    </Form>
  )
}

export default NewPostForm