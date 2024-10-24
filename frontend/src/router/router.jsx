import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./../components/Root";
import Home from "../pages/Home/Home";
import Resturant from "../pages/Resturant/Resturants";
import Menu from "../pages/Menu/Menu";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import UserInfo from "../components/userInfo/UserInfo";
import Payment from "../components/Payment/Payment";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/restaurants/:id",
        element: <Resturant />,
        errorElement: <Error />,

      },
      {
        path: "/restaurant/menu/:id",
        element: <Menu />,
      },
      {
        path: "/userinfo",
        element: <UserInfo />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path:"/Register",element:<Register/>
      },
      {
        path:"/Login",element:<Login/>
      }
    ],
  },
]);

export default router;
