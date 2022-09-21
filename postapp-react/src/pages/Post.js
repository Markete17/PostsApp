import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import moment from 'moment/moment'
import { exposures } from '../helpers/exposures'
import DeletePostButton from '../layouts/DeletePostButton'

const Post = ({post, renderControls}) => {
  return (

   <Card className='mb-2 pb-2'>
    { renderControls &&
        <Card.Header className='d-flex justify-content-between'>
            <div>
                {post.exposure.id === exposures.PRIVATE
                ? 
                <Badge className='badge bg-secondary me-2 mt-2'>{post.exposure.type}</Badge>
                : 
                 <Badge className='badge bg-primary me-2 mt-2'>{post.exposure.type}</Badge>
                }
                {
                post.expired && post.exposure.id === exposures.PUBLIC &&
                    <Badge className='badge bg-danger me-2 mt-2'>Expired</Badge>
                }
                
            </div>
            <div>
                <Button variant="warning mx-1" size="sm" as={NavLink} to={`/editpost/${post.postId}`}>Edit</Button>
                <DeletePostButton postId={post.postId} title={post.title}></DeletePostButton>
            </div>
        </Card.Header>
    }
        <Card.Body>
            <Card.Title><Link to={`/post/${post.postId}`}>{post.title}</Link></Card.Title>
        </Card.Body>
        <Card.Text className='ms-3'>
            Created by {post.user.firstName + ' ' + post.user.lastName}, {moment(post.createdAt).fromNow()}
        </Card.Text>
    </Card>
  )
}

export default Post