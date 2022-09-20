import React,{ useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POSTS_DETAILS_ENDPOINT } from '../helpers/endpoints';
import axios from 'axios';
import moment from 'moment';
import { Card,Button } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { downloadTextAsFile } from '../helpers/helpers';

//https://www.npmjs.com/package/react-toastify
//Para personalizar Toast. El componente principal va en el App.js
import { toast } from 'react-toastify';

const PostDetails = () => {

    const {id} = useParams();
    const [post, setPost] = useState(null)
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(`${POSTS_DETAILS_ENDPOINT}/${id}`).then(
          response => {
            console.log(response.data)
            setPost(response.data)
          }
        ).catch(error =>{
            navigate.push('/')
        })
      }, [id,navigate])
  return (
    <div className='pb-4'>
        {
            post && (
                <React.Fragment>
                <h1 className='mt-3 h-50 p-4 text-white bg-primary rounded-3 text-center'>
                    {post.title}
                </h1>
                <Card className='mb-4'>
                <Card.Body>
                        <Card.Title>Post Details:</Card.Title>
                        <Card.Text>
                        <ul>
                            <li>
                            Created by {post.user.firstName + ' ' + post.user.lastName}, {moment(post.createdAt).fromNow()}
                            </li>
                        </ul>
                        </Card.Text>
                    </Card.Body>
                    <Card className='mx-2 mb-4 pb-2'>
                        <Card.Header>
                            <Button variant="primary me-2" size="sm" onClick={() =>{
                                downloadTextAsFile(post.postId, post.content)
                                toast.info("Downloaded!",
                                {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose:2000
                                })
                                }
                                
                                }>Download</Button>
                                {/*https://www.npmjs.com/package/react-copy-to-clipboard */}
                                <CopyToClipboard 
                                    onCopy={() =>{
                                        toast.info("Copied to Clipboard!",
                                        {
                                        position: toast.POSITION.TOP_RIGHT,
                                        autoClose:2000
                                        })
                                    }
                                    }
                                    text={post.content}
                                >
                                    <Button 
                                        variant="primary" 
                                        size="sm" 
                                        onClick={() =>{

                                        }}>Copy Clipboard
                                    </Button>
                                </CopyToClipboard>
                        </Card.Header>
                        <Card.Body>
                            {/* MAS SOBRE LA BIBLIOTECA EN: https://github.com/react-syntax-highlighter/react-syntax-highlighter */}
                            <SyntaxHighlighter language="javascript" style={coldarkDark} showLineNumbers={true}>
                                {post.content}
                            </SyntaxHighlighter>
                        </Card.Body>
                    </Card>
                </Card>
                </React.Fragment>
            )
        }
    </div>
  )
}

export default PostDetails