import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/AddToCartContext";

export default function Cart() {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  const {addToCart, decreamentFromCart } = useContext(cartContext);
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
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].quantity * items[i].mealId.price;
    }
    return total;
  };

  useEffect(() => {
    getCartItems();
  }, []);
  const updateQuantity = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.mealId._id === id
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  return (
    <div className="col-md-12">
      <div className="card mb-4">
        <div className="card-header py-3 bg-warning">
          <h5 className="mb-0 text-white">Your Cart</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                >
                  <span className="flex-grow-1">{item.mealId.name}</span>

                  <div className="d-flex justify-content-center align-items-center mx-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 0) {
                        
                          decreamentFromCart(item.mealId._id);
                          updateQuantity(item.mealId._id, -1)
                          
                        
                        }
                      }}
                      className="btn btn-light btn-sm"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>

                    <span className="mx-2">{item.quantity}</span>

                    <button
                      onClick={() => {
            
                        addToCart(item.mealId._id); 
                        updateQuantity(item.mealId._id,1)
                      }}
                      className="btn btn-light btn-sm"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>

                  <span>${item.quantity * item.mealId.price}</span>
                </li>
              ))
            ) : (
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                <span>Your cart is empty</span>
              </li>
            )}
            {items.length > 0 && (
              <>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <p className="mb-0">${calculateTotal()}</p>
                  </div>
                </li>
                <button
                  type="button"
                  className="btn btn-primary bg-warning btn-lg btn-block"
                  onClick={() => navigate("/userinfo")}
                >
                  Go to checkout
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
