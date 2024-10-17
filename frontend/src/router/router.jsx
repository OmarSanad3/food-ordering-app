import { createBrowserRouter} from "react-router-dom";
import RootLayout from "./../components/Root";
import Home from "../pages/Home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;