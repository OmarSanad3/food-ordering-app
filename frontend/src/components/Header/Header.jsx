import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./Header.module.css";
import logo from "../../images/Screenshot_2024-10-17_183239-removebg-preview.webp";

function Header() {
  
  const { mytoken,setToken, inHomePage, setSearch} =
    useContext(AppContext);
 
    const navigate=useNavigate()
    function logOut(){
      setToken(null)
      localStorage.removeItem("tkn")
      navigate("/login")

  }
    
  const SignInAndLogin = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/Login">
          Login
        </Link>
      </li>
      <li>
        <Link className="nav-link active" to="/Register">
          Sign Up
        </Link>
      </li>
    </>
  );

  const buttonPages = (
    <>
      {mytoken ? (
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Notification
          </Link>
        </li>
      ) : null}

      {mytoken ? (
        <li className="nav-item">
          <Link className="nav-link" to="/">
            My orders
          </Link>
        </li>
      ) : null}
      <form className="d-flex" role="search">
        <input
          className={`form-control me-2 ${styles.searchInput}`}
          type="search"
          placeholder="Find a Restaurant"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button className="btn btn-outline-warning" type="submit">
          Search
        </button> */}
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
          <li className="nav-item">
            <Link className="dropdown-item" to="#">
              Portsaid
            </Link>
          </li>
          <li className="nav-item">
            <Link className="dropdown-item" to="#">
              Cairo
            </Link>
          </li>
          <li className="nav-item">
          </li>
          <li className="nav-item">
            <Link className="dropdown-item" to="#">
              Alexandria
            </Link>
          </li>
          <li className="nav-item">
            <Link className="dropdown-item" to="#">
              Elmansoura
            </Link>
          </li>
        </ul>
      </li>
      {mytoken ? (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/"role="button" onClick={logOut}>
              Logout
            </Link>
          </li>
        </>
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
            {!mytoken && inHomePage ? (
              SignInAndLogin
            ) : (
              <>
                {!inHomePage ? (
                  buttonPages
                ) : (
                  // if user is registered and not in restaurant page
                  <>
                    <li className="nav-item">
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
