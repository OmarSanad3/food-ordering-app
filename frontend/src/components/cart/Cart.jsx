import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]); // Initialize as an empty array
  const [total, setTotal] = useState(0); // Initialize total amount
  const navigate = useNavigate();

  async function getCartItems() {
    try {
      const res = await axios.get("http://localhost:3000/cart");
      setItems(res.data.cart);
      console.log("in try ", res.data.cart);

      // Calculate total price from cart items
      const totalPrice = res.data.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalPrice);
    } catch (e) {
      if (e.response && e.response.status === 409) {
        console.log(e.response.data);
        setItems([]);
      } else {
        console.log("Error from displaying cart", e);
      }
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  console.log(items);

  return (
    <div className="col-md-12">
      <div className="card mb-4">
        <div className="card-header py-3 bg-warning">
          <h5 className="mb-0 text-white">Your Cart</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {/* Render cart items */}
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                >
                  <span>{item.name}</span>
                  <span>{item.quantity} x ${item.price}</span>
                </li>
              ))
            ) : (
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                <span>Your cart is empty</span>
              </li>
            )}

            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>Gratis</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Total amount</strong>
                <p className="mb-0">(including VAT)</p>
              </div>
              <span>
                <strong>${total.toFixed(2)}</strong>
              </span>
            </li>
          </ul>

          <button
            type="button"
            className="btn btn-primary bg-warning btn-lg btn-block"
            onClick={() => navigate("/userinfo")}
          >
            Go to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
