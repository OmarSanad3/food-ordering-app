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
  const [productsDetails, setproductsDetails] = useState(null);
  const { id } = useParams();

  async function getProductsDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproductsDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProductsDetails();
  }, []);

  const DATA_OBJECT = {
    logo: "https://example.com/logo.png", // Logo URL
    name: "Ahmed's Diner", // Restaurant name
    location: "Downtown, Cairo", // Restaurant location
    smallDescription: "A cozy place serving traditional Egyptian dishes.", // Short description
    cheapestMealPrice: 50, // Cheapest meal price in EGP
    deliveryTime: 45, // Delivery time in minutes
    stars: 4.5, // Average rating (0 to 5)
    tags: ["Egyptian", "Fast Food", "Vegetarian"], // Restaurant tags
    menu: [
      {
        _id: "1", // Meal ID
        title: "Koshary", // Meal title
        image: "https://example.com/koshary.png", // Image URL for the meal
        description:
          "A popular Egyptian dish made of rice, pasta, lentils, and chickpeas.", // Meal description
        price: 60, // Price of the meal in EGP
      },
      {
        _id: "2", // Another meal ID
        title: "Falafel Sandwich", // Meal title
        image: "https://example.com/falafel.png", // Image URL for the meal
        description:
          "A sandwich filled with freshly fried falafel, veggies, and tahini sauce.", // Meal description
        price: 30, // Price of the meal in EGP
      },
    ],
    reviews: {
      count: 2, // Total number of reviews
      reviews: [
        {
          stars: 5, // Rating of the meal (0 to 5)
          username: "user123", // Reviewer's username
          feedback: "The koshary was amazing! Will definitely come again.", // Review text
          date: new Date("2023-10-21"), // Date of the review
        },
        {
          stars: 4, // Rating of the meal (0 to 5)
          username: "foodieAhmed", // Another reviewer's username
          feedback: "Loved the falafel, but it could have been crunchier.", // Review text
          date: new Date("2023-10-20"), // Date of the review
        },
      ],
    },
  };

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
                  <div className="title fs-2 mb-2">{DATA_OBJECT.name}</div>
                  <div className="adress text-black-50 mb-1">
                    {DATA_OBJECT.location}
                  </div>
                  <div className="describtion text-black-50 mb-1">
                    {DATA_OBJECT.smallDescription}
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
                {DATA_OBJECT.menu.map((meal) => {
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
                {DATA_OBJECT.reviews.reviews.map((review, index) => {
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
                name={DATA_OBJECT.name}
                cheapestMealPrice={DATA_OBJECT.cheapestMealPrice}
                deliveryTime={DATA_OBJECT.deliveryTime}
                stars={DATA_OBJECT.stars}
                tags={DATA_OBJECT.tags}
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
