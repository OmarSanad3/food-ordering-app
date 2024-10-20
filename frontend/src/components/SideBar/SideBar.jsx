import styles from "./SideBar.module.css";
export default function SideBar() {
  return (
    <div
      className={`d-none d-lg-flex flex-column flex-shrink-0 p-3 text ${styles.SideBar} `}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none "
      >
        <span className="fs-5 text-black-50">Show results for:</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <p className="fw-bold ">Sorted By:</p>

        <div className="form-check">
          <input
            className={`form-check-input ${styles.formCheckInput}`}
            type="radio"
            name="Sorted"
            id="Popular"
          />
          <label className="form-check-label text-black-50" htmlFor="Popular">
            Popular
          </label>
        </div>
        <div className="form-check">
          <input
            className={`form-check-input ${styles.formCheckInput}`}
            type="radio"
            name="Sorted"
            id="Rating"
          />
          <label className="form-check-label text-black-50" htmlFor="Rating">
            Rating
          </label>
        </div>
        <div className="form-check">
          <input
            className={`form-check-input ${styles.formCheckInput}`}
            type="radio"
            name="Sorted"
            id="Delivery"
          />
          <label className="form-check-label text-black-50" htmlFor="Delivery">
            Delivery Time
          </label>
        </div>
      </ul>
      <button className = "btn btn-warning mt-3 p-1" >Apply</button>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <p className="fw-bold ">Dishes:</p>

        <div className="form-check">
          <input
            className={`form-check-input ${styles.formCheckInput}`}
            type="radio"
            name="Dishes"
            id="Pizza"
          />
          <label className="form-check-label text-black-50" htmlFor="Pizza">
            Pizza
          </label>
        </div>
        <div className="form-check">
          <input
            className={`form-check-input ${styles.formCheckInput}`}
            type="radio"
            name="Dishes"
            id="Burger"
          />
          <label className="form-check-label text-black-50" htmlFor="Burger">
            Burger
          </label>
        </div>
        <div className="form-check">
          <input
            className={`form-check-input ${styles.formCheckInput}`}
            type="radio"
            name="Dishes"
            id="Shawerma"
          />
          <label className="form-check-label text-black-50" htmlFor="Shawerma">
            Shawerma
          </label>
        </div>
        <div className="form-check">
          <input
            className={`form-check-input ${styles.formCheckInput}`}
            type="radio"
            name="Dishes"
            id="Koshary"
          />
          <label className="form-check-label text-black-50" htmlFor="Koshary">
            Koshary
          </label>
        </div>
      </ul>
    
      <button className = "btn btn-warning mt-3 p-1" >Apply</button>
    </div>
  );
}
