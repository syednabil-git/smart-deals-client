import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
    baseURL: 'https://smart-deals-server-enp1.onrender.com'
})

const useAxiosSecure = () => {
const { user, signOutUser} = useAuth();
const navigate = useNavigate();

    useEffect(() =>{
       const requestIntercepter =  instance.interceptors.request.use((confiq) => {
        const token = user.accessToken;
        if(token) {
            confiq.headers.authorization = `Bearer ${token}`
        }
        return confiq;
    })
    const responseInterceptor = instance.interceptors.response.use(res => {
        return res;
    }, err => {
        const status = err.status;
        if(status === 401 || status === 403){
           
            signOutUser()
            .then(() => {
                    navigate('/register');
            })
        }
    })
    return () => {
        instance.interceptors.request.eject(requestIntercepter);
        instance.interceptors.response.eject(responseInterceptor);
    }
    }, [user, signOutUser, navigate])

    return instance;
}
export default useAxiosSecure;