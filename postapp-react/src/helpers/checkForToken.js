import jwtDecode from "jwt-decode"
import setAuthToken from "./setAuthToken"
import store from '../store'
import { logoutUser } from "../actions/authActions"

const checkForToken = () => {
    if(localStorage.jwtToken){
        setAuthToken(localStorage.jwtToken)
        const decoded = jwtDecode(localStorage.jwtToken)



        const currentTime = Math.floor(Date.now / 1000);

        if(decoded.exp < currentTime){
            store.dispatch(logoutUser());
            localStorage.removeItem("jwtToken")
            window.location.href= '/signin'
        }
    }
}

export default checkForToken