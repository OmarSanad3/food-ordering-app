import { useContext, useEffect, useState } from "react";

import img from "../../assets/dish1.webp";
import { cartContext } from "../../context/AddToCartContext";
import toast from "react-hot-toast";
import axios from "axios";


export default function Order({ mealId, title, image, description, price }) {
  const { addToCart} = useContext(cartContext);
  const [items, setItems] = useState([]);
  

  function addProduct() {
    addToCart(mealId);
    console.log("Product added to cart:", mealId);
  }
  async function getCartItems() {
    try {
      const res = await axios.get("http://localhost:3000/cart", {
        headers: { Authorization: localStorage.getItem("tkn") },
      });
      setItems(res.data.cart);
      console.log("Cart items:", res.data.cart);
    } catch (e) {
      if (e.response && e.response.status === 409) {
        console.log(e.response.data);
        setItems([]);
      } else {
        console.log("Error fetching cart data", e);
      }
    }
  }
  const updateQuantity = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.mealId._id === id
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="d-flex pt-2 pb-2 gap-3">
        <img
          src={image === "https://example.com/topdish.png" ? img : image}
          alt=""
          style={{ height: "40px" }}
          className="me-2"
        />
        <div className="item-name" style={{ width: "100%" }}>
          <h4 className="fs-6">{title}</h4>
          <p className={`text-black-50`}>{description}</p>
        </div>
        <div className="price d-flex justify-content-end">
          <div style={{ maxWidth: "100%" }}>EGP {price}</div>
          <i
            className="bi bi-plus-circle-fill text-warning cursor-pointer"
            onClick={() => 
              
              {addProduct() 
                updateQuantity(mealId,1)
              
            }}
          ></i>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
}
