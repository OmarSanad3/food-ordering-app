import styles from "./Card.module.css"; // Importing the CSS module
import img from "../../assets/dish1.jpg";
function Card() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageSection}>
        <img
          src={img}
          alt="Chicken Sweet & Sour"
          className={styles.foodImage}
        />
        <div className={styles.priceTag}>
          <span>173.68 EGP</span>
        </div>
      </div>
      <div className={styles.detailsSection}>
        <div className="d-flex justify-content-between ">
          <h3 className={styles.restaurantName}>Wok and Walk</h3>
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★☆</span> {/* 4.5 star rating */}
            <span className={styles.ratingNumber}>(39081)</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
          <div className={styles.description}>
            <p className = "m-0">Made in Egypt • Chinese</p>
          </div>
            <i className="bi bi-credit-card text-success"></i>
        </div>
        <div className={styles.offers}>
          <span> 40 EGP on orders above 150 EGP</span>
        </div>
        <div className={styles.deliveryInfo}>
          <span className={styles.deliveryTime}>🛵 60 mins</span>
          <span className={styles.orderOnline}>
            <i
              className="bi bi-circle-fill text-success "
              style={{ fontSize: "0.8rem" }}
            ></i>{" "}
            Order Online
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
