import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./Header.module.css";
import logo from "../../images/Screenshot_2024-10-17_183239-removebg-preview.png";
function Header() {
  const { isRegistered, inHomePage } = useContext(AppContext);
  const SignInAndLogin = (
    <>
      <li className = "nav-item">
        {/* add sign up page here  */}
        <Link className="nav-link" to="/">
          Login
        </Link>
      </li>
      <li className = "nav-item">
        <Link className="nav-link active" to="/">
          Sign Up
        </Link>
      </li>
    </>
  );

  const buttonPages = (
    <>
      {isRegistered ? (
        <li className = "nav-item">
          <Link className="nav-link" to="/">
            Notification
          </Link>
        </li>
      ) : null}

      {isRegistered ? (
        <li className = "nav-item">
          <Link className="nav-link" to="/">
            My orders
          </Link>
        </li>
      ) : null}
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Find a Restaurant"
          aria-label="Search"
        />
        <button className="btn btn-outline-warning" type="submit">
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
          Change City
        </Link>
        <ul className="dropdown-menu">
          <li className = "nav-item">
            <Link className="dropdown-item" to="#">
              Action
            </Link>
          </li>
          <li className = "nav-item">
            <Link className="dropdown-item" to="#">
              Another action
            </Link>
          </li>
          <li className = "nav-item">
            <hr className="dropdown-divider" />
          </li>
          <li className = "nav-item">
            <Link className="dropdown-item" to="#">
              Something else here
            </Link>
          </li>
        </ul>
      </li>
      {isRegistered ? (
        <li className = "nav-item">
          <Link className="nav-link" to="/">
            Profile
          </Link>
        </li>
      ) : (
        SignInAndLogin
      )}
    </>
  );

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${
        inHomePage ? styles.transparentNavbar : null
      }  ${inHomePage ? "navbar-dark" : null}`}
      style={{ backgroundColor: "transparent !important" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className={`${styles.logo} d-flex align-item-center `}>
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-text-top"
            />
          </div>
        </Link>
        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            {!isRegistered && inHomePage ? (
              SignInAndLogin
            ) : (
              <>
                {!inHomePage ? (
                  buttonPages
                ) : (
                  // if user is registered and not in restaurant page
                  <>
                    <li className = "nav-item">
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
