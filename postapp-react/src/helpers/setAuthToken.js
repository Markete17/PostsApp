import axios from "axios";

// Para que en las peticiones HTTP, si hay token, lleve siempre en las cabeceras el token
const setAuthToken = token => {
    if (token){
        axios.defaults.headers.common["Authorization"] = token
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

export default setAuthToken;