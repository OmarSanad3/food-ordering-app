import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import router from "./router/router";
import CartContextProvider from "./context/AddToCartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return <>

    <CartContextProvider>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
   </CartContextProvider>  
    <Toaster/>
    </>

}
export default App;

