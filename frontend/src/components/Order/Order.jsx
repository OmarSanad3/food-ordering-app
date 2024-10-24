import { useContext, useEffect } from "react";

import img from "../../assets/dish1.webp";
import { cartContext } from "../../context/AddToCartContext";
import toast from "react-hot-toast";

export default function Order({ mealId, title, image, description, price }) {
  const { addToCart, decreamentFromCart, deleteCart } = useContext(cartContext);

  function addProduct() {
    addToCart(mealId);
    console.log("Product added to cart:", mealId);
  }
  function deleteProduct() {
    decreamentFromCart(mealId);
    console.log("Product deleted from cart:", mealId);
  }

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
            onClick={() => addProduct()}
          ></i>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
}
