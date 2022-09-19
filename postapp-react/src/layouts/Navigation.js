import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../actions/authActions'
import { useNavigate } from 'react-router-dom'


const Navigation = () => {

    const loggedIn = useSelector(state => state.auth.loggedIn)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser());
        navigate('/signin')
    }

  return (
    <Navbar bg="dark" variant='dark' expand='lg'>
        <Navbar.Brand as={NavLink} to={'/'} className='mx-3'>PostsApp</Navbar.Brand>
        <Navbar.Toggle aria-controls='main-menu'></Navbar.Toggle>
        <Navbar.Collapse id='main-menu'>
            <Nav className="me-auto">
                {loggedIn && <Nav.Link className='me-3'>Create Post</Nav.Link>}
            </Nav>
            <Nav>
                { 
                
                !loggedIn ? 
                <React.Fragment>
                    <Nav.Link className='mx-4' as={NavLink} to={'/signup'}>Register</Nav.Link>
                    <Nav.Link className='mx-4' as={NavLink} to={'/signin'}>Sign In</Nav.Link>
                </React.Fragment>
                :
                <NavDropdown className='col-md-4 me-4' title={user.userDetails.firstName} id="menu-dropdown">
                    <NavDropdown.Item className='col-md-4 me-4' as={NavLink} to={'/posts'}>Posts</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout} className='col-md-4 me-4'>Log Out</NavDropdown.Item>
                </NavDropdown>
            }

            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation