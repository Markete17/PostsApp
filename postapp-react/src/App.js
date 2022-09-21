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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"

//moment config
import PostDetails from "./pages/PostDetails";
import NewPost from "./pages/NewPost";
//import 'moment/locale/es'
//moment.locale('es') Para formatear las fechas en idiomas
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditPost from "./pages/EditPost";

checkForToken();

function App() {
  return (
    <Provider store={store}>
    <div>
      <div>
        <Navigation></Navigation>
      </div>
      <Container>
        {/*https://www.npmjs.com/package/react-toastify*/}
        <ToastContainer/>
        <Routes>
            <Route exact path="/" element={<Posts/>}></Route>
            <Route exact path="/signin" element={<SignIn/>}></Route>
            <Route exact path="/signup" element={<SignUp/>}></Route>
            <Route exact path="/post/:id" element={<PostDetails/>}></Route>
            <Route exact path="/posts" element={<PrivateRoute/>}>
              <Route exact path='/posts' element={<UserPosts/>}/>
            </Route>
            <Route exact path="/newpost" element={<PrivateRoute/>}>
              <Route exact path='/newpost' element={<NewPost/>}/>
            </Route>
            <Route exact path="/editpost/:id" element={<PrivateRoute/>}>
              <Route exact path='/editpost/:id' element={<EditPost/>}/>
            </Route>
        </Routes>
      </Container>
    </div>
    </Provider>
    
  );
} 

export default App;