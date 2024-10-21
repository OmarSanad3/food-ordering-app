import styles from "./Card.module.css"; // Importing the CSS module
import img from "../../assets/dish1.webp";
//  title stars reviews offer deliveryTime  location / there is image and price remaining
function Card({ title, stars, reviews, offer, deliveryTime, location }) {
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
          <h3 className={styles.restaurantName}>{title}</h3>
          <div className={styles.rating}>
            <span className={styles.stars}>
              {[...Array(5)].map((_, index) => {
                if (index < Math.floor(stars)) {
                  return (
                    <i key={index} className="bi bi-star-fill text-warning"></i>
                  );
                } else if (index < stars) {
                  return (
                    <i key={index} className="bi bi-star-half text-warning"></i>
                  );
                } else {
                  return (
                    <i key={index} className="bi bi-star text-warning"></i>
                  );
                }
              })}
            </span>
            {/* 4.5 star rating */}
            <span className={styles.ratingNumber}> ({reviews}) </span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
          <div className={styles.description}>
            <p className="m-0">{location}</p>
          </div>
          <i className="bi bi-credit-card text-success"></i>
        </div>
        <div
          className={styles.offers}
          style={{ opacity: `${offer ? "1" : "0"}` }}
        >
          <span> {offer ? offer : "NA"}</span>
        </div>
        <div className={styles.deliveryInfo}>
          <span className={styles.deliveryTime}>🛵 {deliveryTime} mins</span>
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
