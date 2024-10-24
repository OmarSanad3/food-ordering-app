import axios from "axios";
import { createContext } from "react";
import React from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {

  function addToCart(id) {
    axios
      .post(
        "http://localhost:3000/add-to-cart",
        {
          mealId: id,
        },
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log("res", res);
        toast.success("item is added to cart", {
          duration: 1500,
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("item failed to added in cart", {
          duration: 1500,
          position: "top-center",
        });
      });
  }
  function decreamentFromCart(id) {
    axios
      .delete(
        `http://localhost:3000/remove-from-cart/${id}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function deleteCart() {
    axios
      .delete(`http://localhost:3000/clear-cart`, {
        headers: { Authorization: localStorage.getItem("tkn") },
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        decreamentFromCart,
        deleteCart,
      }}
    >
      {" "}
      {children}
    </cartContext.Provider>
  );
}
