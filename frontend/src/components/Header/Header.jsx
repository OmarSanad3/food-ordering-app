import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./Header.module.css";
import logo from "../../images/Screenshot_2024-10-17_183239-removebg-preview.png";
function Header() {
  const { isRegistered, inHomePage } = useContext(AppContext);
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

  const buttonPages = (
    <>
      {isRegistered ? (
        <li>
          <Link className="nav-link" to="/">
            Notification
          </Link>
        </li>
      ) : null}

      {isRegistered ? (
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
      {isRegistered ? (
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
  // const buttonPagesWithoutReg
  console.log(isRegistered);
  
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

        <div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-row gap-3">
            {!isRegistered && inHomePage ? (
              SignInAndLogin
            ) : (
              <>
                {!inHomePage ? (
                  buttonPages
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
