import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./../components/Root";
import Home from "../pages/Home/Home";
import Resturant from "../pages/Resturant/Resturants";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/resturants", element: <Resturant /> },
    ],
  },
]);

export default router;
