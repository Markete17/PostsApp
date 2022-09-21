import axios from "axios"
import jwtDecode from "jwt-decode";
import { LOGIN_ENDPOINT,REGISTER_ENDPOINT } from "../helpers/endpoints";
import { SET_CURRENT_USER } from "./types";
import setAuthToken from "../helpers/setAuthToken";
import { USER_ENDPOINT } from "../helpers/endpoints";

export const loginUser = (userData) => disptach => {

    return new Promise((resolve,reject) => {
        axios.post(
            LOGIN_ENDPOINT,
            userData,
            {
                headers: 
                    {'Accept': 'application/json',
                    'Content-type':'application/json'
                    }
            }
        ).then(response => {
            const {authorization} = response.headers;
            
            localStorage.setItem("jwtToken",authorization);

            setAuthToken(authorization); // Funcion creada en helpers para añadir en todos los headers posteriores el token en la cabecera 
            
            
            const decoded = jwtDecode(authorization);

            axios.get(USER_ENDPOINT).then(response => {
                decoded.userDetails = response.data
                localStorage.setItem("user",JSON.stringify(decoded));
                
                localStorage.setItem("loggedIn",true);
                disptach(setCurrentUser({user:decoded, loggedIn:true}));

                resolve(response)
            }).catch(e => {
                console.log(e)
            }
                )

        }).catch(error =>{
            console.log(error)
            reject(error);
        })
    })
}

export const setCurrentUser = ({user,loggedIn}) => {
    return {
        type: SET_CURRENT_USER,
        payload: {user,loggedIn}
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    setAuthToken(false)
    
    dispatch(setCurrentUser({
        user: {},
        loggedIn: false
    }))
}

export const registerUser = (userData) => disptach => {

    return new Promise((resolve,reject) => {
        axios.post(
            REGISTER_ENDPOINT,
            userData,
            {
                headers: 
                    {'Accept': 'application/json',
                    'Content-type':'application/json'
                    }
            }
        ).then(response => {
            resolve(response)
        }).catch(error =>{
            console.log(error)
            reject(error);
        })
    })
}