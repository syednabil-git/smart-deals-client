import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://smart-deals-server-enp1.onrender.com'
})

const useAxios = () => {
    return axiosInstance;
}
export default useAxios;