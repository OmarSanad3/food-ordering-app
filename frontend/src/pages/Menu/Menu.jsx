import styles from "./Menu.module.css";
// import logo from "../../images/kfc-logo-editorial-free-vector.jpg";
import Cart from "../../components/cart/Cart";
import Order from "../../components/Order/Order";
import { useEffect, useState } from "react";
import Reviews from "../../components/Reviews/Reviews";
import Info from "../../components/Info/Info";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { cartContext } from "../../context/AddToCartContext";


export default function Menu() {
  const [selectedTab, setSelectedTab] = useState("menu");
  const {addToCart}=useContext(cartContext)
  const [productsDetails, setproductsDetails] = useState([]);
  const { id } = useParams();

  async function getProductsDetails() {
    try {
      const res = await axios.get(`http://localhost:3000/restaurant/${id}`);
      setproductsDetails(res.data.restaurant);
      console.log(res.data.restaurant);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    getProductsDetails()
    
  }, [])
  


  return (
    <>
      <div className={`${styles.header} `}>
        <div className="container">
          <div className="row  pt-3 pb-3 pe-0 ps-0 mt-4 mb-4 align-items-center">
            <div className="col-sm-8 me-auto">
              <div className="row">
                <div className="col-sm-2">
                  <img className="img-fluid" src="" width={120} height={150} />
                </div>
                <div className="col-sm-4 ">
                  <div className="title fs-2 mb-2">{productsDetails.name}</div>
                  <div className="adress text-black-50 mb-1">
                    {productsDetails.location}
                  </div>
                  <div className="describtion text-black-50 mb-1">
                    {productsDetails.smallDescription}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="status fs-6 mb-4 text-black-50 text-end">
                Very Good
              </div>
              <ul className="list-unstyled d-flex gap-3 fs-3 justify-content-end">
                <li>
                  <i className="fa-brands fa-cc-visa "></i>
                </li>
                <li>
                  <i className="fa-brands fa-cc-mastercard"></i>
                </li>
                <li>
                  <i className="fa-solid fa-money-bill"></i>
                </li>
              </ul>
            </div>
          </div>
          <div className={`row  ${styles.row2}  `}>
            <ul className="list-unstyled d-flex gap-3 justify-content-center text-center">
              <li className="col-4 ">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-book fs-5 bg-warning"></i>
                  <button
                    className={`btn fs-5 ms-2 ${styles.active}`}
                    onClick={() => setSelectedTab("menu")}
                  >
                    Menu
                  </button>
                </div>
              </li>
              <li className="col-4  ">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-chat-dots fs-5 bg-warning"></i>
                  <button
                    className=" btn fs-5 ms-2 text-center"
                    onClick={() => setSelectedTab("reviews")}
                  >
                    Reviews
                  </button>
                </div>
              </li>
              <li className="col-4 ">
                <div className="d-flex align-items-center justify-content-center ">
                  <i className="bi bi-info-circle-fill fs-5 bg-warning"></i>
                  <button
                    className="btn fw-normal fs-5 ms-2"
                    onClick={() => setSelectedTab("info")}
                  >
                    info
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <div className={`row ${styles.row3} pt-md-3`}>
            {selectedTab === "menu" ? (
              <div className="col-md-12 col-lg-9">

                {productsDetails.menu &&
                  Array.isArray(productsDetails.menu) &&
                  productsDetails.menu.map((meal) => {
                    return (
                      <Order
                        key={meal._id}
                        title={meal.title}
                        image={meal.image}
                        description={meal.description}
                        price={meal.price}
                      />
                    );
                  })}
              </div>
            ) : selectedTab === "reviews" ? (
              <div className="col-md-12 col-lg-9">
                {productsDetails.reviews.reviews.map((review, index) => {
                  return (
                    <Reviews
                      key={index}
                      stars={review.stars}
                      username={review.username}
                      feedback={review.feedback}
                      date={review.date.toDateString()}
                    />
                  );
                })}
              </div>
            ) : (
              <Info
                name={productsDetails.name}
                cheapestMealPrice={productsDetails.cheapestMealPrice}
                deliveryTime={productsDetails.deliveryTime}
                stars={productsDetails.stars}
                tags={productsDetails.tags}
              />
            )}

            <div className="col-md-12 mt-md-5 mt-lg-2 col-lg-3">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
