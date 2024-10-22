import styles from "./Menu.module.css";
// import logo from "../../images/kfc-logo-editorial-free-vector.jpg";
import Cart from "../../components/cart/Cart";
import Order from "../../components/Order/Order";
import { useState } from "react";
import Reviews from "../../components/Reviews/Reviews";
import Info from "../../components/Info/Info";

export default function Menu() {
  const [selectedTab, setSelectedTab] = useState("menu");

  return (
    <>
      <div className={`${styles.header} p-lg-4 pb-lg-0`}>
        <div className="container">
          <div className="row p-lg-4 p-3 mt-4 mb-4 align-items-center">
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-2">
                  <img
                    className="img-fluid"
                    src="https://images.deliveryhero.io/image/talabat/restaurants/New_Project_-_2020-1_637382995109103333.jpg?width=180"
                    width={120}
                    height={150}
                  />
                </div>
                <div className="col-sm-4">
                  <div className="title fs-2 mb-2">Crep Town</div>
                  <div className="adress text-black-50 mb-1">
                    in Tarh-elbahr
                  </div>
                  <div className="describtion text-black-50 mb-1">
                    Fast food
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="status fs-6 mb-4 text-black-50">Very Good</div>
              <ul className="list-unstyled d-flex gap-3 fs-3">
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
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
              </div>
            ) : selectedTab === "reviews" ? (
              <div className="col-md-12 col-lg-9">
                <Reviews />
                <Reviews />
                <Reviews />
              </div>
            ) : (
              <Info />
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
