import axios from "axios";
import { createContext } from "react";
export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  function addToCart(id) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          mealId: id,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <cartContext.Provider value={{ addToCart }}>
      {children}
    </cartContext.Provider>
  );
}
