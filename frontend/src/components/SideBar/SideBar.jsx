import styles from "./SideBar.module.css";

const dishes = ["All", "Pizza", "Burger", "Shawerma", "Koshary", "Sushi"];
const sortingOptions = ["Popular", "Rating", "Delivery"];

export default function SideBar({
  selectedOption,
  selectedDish,
  handleSortChange,
  handleSelectDish,
}) {
  return (
    <div
      className={`d-none d-lg-flex flex-column flex-shrink-0 p-3 text ${styles.SideBar} `}
    >
      <span className="fs-5 text-black-50">Show results for:</span>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <p className="fw-bold ">Sorted By:</p>

        {sortingOptions.map((option) => (
          <div className="form-check" key={option}>
            <input
              className={`form-check-input ${styles.formCheckInput}`}
              type="radio"
              name="Sorted"
              id={option}
              checked={selectedOption === option}
              onChange={() => handleSortChange(option)}
            />
            <label className="form-check-label text-black-50" htmlFor={option}>
              {option === "Delivery" ? "Delivery Time" : option}
            </label>
          </div>
        ))}
      </ul>

      {/* <button className="btn btn-warning mt-3 p-1">Apply</button> */}
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <p className="fw-bold ">Dishes:</p>

        {dishes.map((dish) => (
          <div className="form-check" key={dish}>
            <input
              className={`form-check-input ${styles.formCheckInput}`}
              onChange={() => handleSelectDish(dish)}
              type="radio"
              name="Dishes"
              id={dish}
              checked={selectedDish === dish}
            />
            <label className="form-check-label text-black-50" htmlFor={dish}>
              {dish}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
}
