import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRouter from "./PrivateRouter";

// 🔥 Lazy imports
const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"));
const AllProduct = lazy(() => import("../pages/AllProduct"));
const CreateProduct = lazy(() => import("../pages/CreateProduct"));
const MyProduct = lazy(() => import("../pages/MyProduct"));
const MyBids = lazy(() => import("../pages/MyBids"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ProductDetails = lazy(() => import("../components/ProductDetails"));
const EditProduct = lazy(() => import("../components/EditProduct"));

// 🔥 Wrapper for Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(App),
    children: [
      {
        path: "/",
        element: withSuspense(Home),
      },
      {
        path: "/all-product",
        element: withSuspense(AllProduct),
      },
      {
        path: "/create-product",
        element: withSuspense(CreateProduct),
      },
      {
        path: "/my-product",
        element: (
          <PrivateRouter>
            {withSuspense(MyProduct)}
          </PrivateRouter>
        ),
      },
      {
        path: "/edit-product/:id",
        element: withSuspense(EditProduct),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRouter>
            {withSuspense(MyBids)}
          </PrivateRouter>
        ),
      },
      {
        path: "productDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-server-enp1.onrender.com/products/${params.id}`
          ),
        element: (
          <PrivateRouter>
            {withSuspense(ProductDetails)}
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/register",
    element: withSuspense(Register),
  },
]);