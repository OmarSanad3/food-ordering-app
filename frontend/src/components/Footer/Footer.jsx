
import styles from "./Footer.module.css";
import mylogo from "../../images/Screenshot_2024-10-17_183239-removebg-preview.webp";

export default function Footer() {
  return (
    <>
      <div
        className={`${styles.footer} pt-5 pb-5 text-black-50 text-center text-md-start footer `}
      >
        <div className="container">
          <div className={`row pt-lg-3 pb-lg-3 pt-5  ${styles.row1}`}>
            <div className="col-md-6 col-lg-2">
              <div className={`${styles.cities}`}>
                <h5 className={`text-black ${styles.title} pb-1 text-center`}>
                  Cities
                </h5>
                <ul className="list-unstyled lh-lg text-center text-black-50">
                  <li>Portsaid</li>
                  <li>Cairo</li>
                  <li>Alexandria</li>
                  <li>Elmansoura</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className={`${styles.links}`}>
                <h5 className={`text-black ${styles.title} pb-1 text-center`}>
                  Links
                </h5>
                <ul className="list-unstyled lh-lg text-center text-black-50">
                  <li>Home</li>
                  <li>Our services</li>
                  <li>Support</li>
                  <li>Terms and Condition</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="about">
                <h5 className={`text-black ${styles.title} pb-1 text-center`}>
                  About Us
                </h5>
                <ul className="list-unstyled lh-lg text-center text-black-50">
                  <li>Sign In </li>
                  <li>Register</li>
                  <li> About Us </li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="about">
                <h5 className={`text-black ${styles.title} pb-1 text-center`}>
                  Follow Us On
                </h5>
                <ul className="d-flex mt-3 list-unstyled gap-2 fs-4 text-center justify-content-center text-black-50">
                  <li>
                    <i className="rounded-circle p-3 fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i className="rounded-circle p-3 fa-brands fa-instagram  "></i>
                  </li>
                  <li>
                    <i className="rounded-circle p-3 fa-brands fa-linkedin "></i>
                  </li>
                  <li>
                    <i className="rounded-circle p-3 fa-brands fa-twitter "></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5 col-lg-3">
              <div className={`${styles.contact}`}>
                <h5 className={`text-black ${styles.title} pb-1 text-center`}>
                  Contact us
                </h5>
                <p className="text-black-50 mt-3 mb-3 text-center">
                  Get in touch with us via mail phone.We are waiting for your
                  call or message
                </p>
                <a
                  className={`btn rounded-pill main-btn w-100 button text-black-50 text-center ${styles.email}`}
                  href="mailto:Foodzy@gmail.com"
                >
                  Foodzy@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className={`row pt-lg-3 pb-lg-3 pt-5  ${styles.row2}`}>
            <div className="col-md-6 col-lg-4 pt-3">
              <div className="info">
                <div className="copyright text-black-50">
                  Created BY <span>Dev Team</span>
                  <div>
                    &copy;2024- <span>Foodzy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 pt-3 ms-auto">
              <div className="logo">
                <img src={mylogo} alt="logo" width={"200px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
