import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import router from "./router/router";
import CartContextProvider from "./context/AddToCartContext";

function App() {
  return (
    <CartContextProvider>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
</CartContextProvider>  );


}
export default App;

