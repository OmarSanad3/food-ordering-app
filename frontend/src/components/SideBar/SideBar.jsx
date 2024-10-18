import styles from "./SideBar.module.css"
export default function SideBar() {
  return (
    <div
      className={`d-none d-lg-flex flex-column flex-shrink-0 p-3 text ${styles.SideBar} ` }
      
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none "
      >
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.active}`} aria-current="page">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link ">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link ">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link ">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link ">
            Customers
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center  text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
