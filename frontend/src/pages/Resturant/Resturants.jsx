import { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function RestaurantPage() {
  // Access the context to update the `inRestaurantPage` state
  const { setRestaurantPage } = useContext(AppContext);

  // Using useEffect to set the page status when the component mounts and unmounts
  useEffect(() => {
    setRestaurantPage(true); // Set `inRestaurantPage` to true when the page loads

    return () => {
      setRestaurantPage(false); // Set `inRestaurantPage` to false when the page unloads
    };
  }, [setRestaurantPage]);

  return (
    <div className="restaurant-page">
      <h1>Welcome to the Restaurant Page</h1>
      <p>
        Here you can browse our list of top restaurants, view menus, and make
        reservations!
      </p>

      <div className="restaurant-list">
        <h2>Top Restaurants</h2>
        <ul>
          <li>
            Restaurant A - <a href="/restaurants/1">View Details</a>
          </li>
          <li>
            Restaurant B - <a href="/restaurants/2">View Details</a>
          </li>
          <li>
            Restaurant C - <a href="/restaurants/3">View Details</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RestaurantPage;
