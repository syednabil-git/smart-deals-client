import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AllProduct from "../pages/AllProduct";
import CreateProduct from "../pages/CreateProduct";
import MyProduct from "../pages/MyProduct";
import MyBids from "../pages/MyBids";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../components/ProductDetails";
import PrivateRouter from "./PrivateRouter";
import EditProduct from "../components/EditProduct";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/all-product',
                element: <AllProduct></AllProduct>,
            },
            {
                path:'/create-product',
                element:<CreateProduct></CreateProduct>,
            },
            {
                path:'/my-product',
                element: (<PrivateRouter>
                    <MyProduct></MyProduct>
                </PrivateRouter>),
            },
            {
                path:'/edit-product/:id',
                element: (
                    <EditProduct></EditProduct>
                )
            },
            {
                path:'/my-bids',
                element:(<PrivateRouter>
                    <MyBids></MyBids>
                </PrivateRouter>),
            },
            {
                path: 'productDetails/:id',
                loader: ({params}) => fetch(`https://smart-deals-server-enp1.onrender.com/products/${params.id}`),
                element: <PrivateRouter>
                    <ProductDetails></ProductDetails>
                </PrivateRouter>
            },
        
        ],
    },
    {
        path:'/login',
        element: <Login></Login>,

    },
    {
        path:'/register',
        element:<Register></Register>,
    },
]);