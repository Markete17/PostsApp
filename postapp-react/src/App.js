import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./layouts/Navigation";
import {Routes,Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { Container } from "react-bootstrap";
import Posts from "./pages/Posts";
import store from './store';
import {Provider} from 'react-redux';
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import UserPosts from "./pages/UserPosts";
import SignUp from "./pages/SignUp";

checkForToken();

function App() {
  return (
    <Provider store={store}>
    <div>
      <div>
        <Navigation></Navigation>
      </div>
      <Container>
        <Routes>
            <Route exact path="/" element={<Posts/>}></Route>
            <Route exact path="/signin" element={<SignIn/>}></Route>
            <Route exact path="/signup" element={<SignUp/>}></Route>
            <Route exact path="/posts" element={<PrivateRoute/>}>
              <Route exact path='/posts' element={<UserPosts/>}/>
            </Route>
        </Routes>
      </Container>
    </div>
    </Provider>
    
  );
} 

export default App;