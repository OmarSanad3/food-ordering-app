import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./../components/Root";
import Home from "../pages/Home/Home";
import Resturant from "../pages/Resturant/Resturants";
import Menu from "../pages/Menu/Menu";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/resturants",
        element: <Resturant />,
        errorElement: <Error />,

      },
      {
        path: "/menu/:id",
        element: <Menu />,
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
