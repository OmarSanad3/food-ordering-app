import styles from "./Menu.module.css";
// import logo from "../../images/kfc-logo-editorial-free-vector.jpg";
import Cart from "../../components/cart/Cart";
import Order from "../../components/Order/Order";
import { useEffect, useState } from "react";
import Reviews from "../../components/Reviews/Reviews";
import Info from "../../components/Info/Info";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Menu() {
  const [selectedTab, setSelectedTab] = useState("menu");
  const [productsDetails, setproductsDetails] = useState(null)
  const{id}=useParams()
  
 async function getProductsDetails(){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/products/6428ebc6dc1175abc65ca0b9`).then((res)=>{
      setproductsDetails(res.data.data)
      console.log(res.data.data);
      
    }).catch((err)=>{
      console.log(err);
      
    })
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
                  <img
                    className="img-fluid"
                    src={productsDetails.imageCover}
                    width={120}
                    height={150}
                  />
                </div>
                <div className="col-sm-4 ">
                  <div className="title fs-2 mb-2">{productsDetails.title}</div>
                  <div className="adress text-black-50 mb-1">
                    in Tarh-elbahr
                  </div>
                  <div className="describtion text-black-50 mb-1">
                    Fast food
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="status fs-6 mb-4 text-black-50 text-end">Very Good</div>
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
