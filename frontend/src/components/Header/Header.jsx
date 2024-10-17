import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./Header.module.css";
function Header() {
  const { isRegister, inRestaurantPage } = useContext(AppContext);
  const SignInAndLogin = (
    <>
      <li>
        {/* add sign up page here  */}
        <Link className="nav-link" to="/">
          Login
        </Link>
      </li>
      <li>
        <Link className="nav-link active" to="/">
          Sign Up
        </Link>
      </li>
    </>
  );
  const buttonsInRestaurantPage = (
    <>
      {isRegister ? (
        <li>
          <Link className="nav-link" to="/">
            Notification
          </Link>
        </li>
      ) : null}

      {isRegister ? (
        <li>
          <Link className="nav-link" to="/">
            My orders
          </Link>
        </li>
      ) : null}
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Change city
        </Link>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="#">
              Action
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Another action
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Something else here
            </Link>
          </li>
        </ul>
      </li>
      {isRegister ? (
        <li>
          <Link className="nav-link" to="/">
            Profile
          </Link>
        </li>
      ) : (
        SignInAndLogin
      )}
    </>
  );
  // const buttonsInRestaurantPageWithoutReg

  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary ${styles.transparentNavbar } navbar-dark`} style={{ backgroundColor: 'transparent !important' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>

        <div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-row gap-3">
            {!isRegister && !inRestaurantPage ? (
              SignInAndLogin
            ) : (
              <>
                {inRestaurantPage ? (
                  buttonsInRestaurantPage
                ) : (
                  // if user is registered and not in restaurant page
                  <>
                    <li>
                      <Link className="nav-link" to="/">
                        Profile
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;