import { useContext, useEffect } from "react";


import img from "../../assets/dish1.webp";
import { cartContext } from "../../context/AddToCartContext";

export default function Order({ key,title, image, description, price}) {
  const { addToCart } = useContext(cartContext);

  function addProduct() {
    addToCart(key);
    console.log("Product added to cart:", key);
  }


  return (
    <>
      <div className="d-flex pt-2 pb-2 gap-3">
        <img src={img} alt="" style={{ height: "40px" }} className="me-2" />
        <div className="item-name" style={{ width: "100%" }}>
          <h4 className="fs-6">{title}</h4>
          <p className={`text-black-50`}>{description}</p>
        </div>
        <div className="price d-flex justify-content-end">
          <div style={{ maxWidth: "100%" }}>EGP {price}</div>
          <i
            className="bi bi-plus-circle-fill text-warning"
            onClick={() => addProduct()}
          ></i>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
}
