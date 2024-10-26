import styles from "./Error.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
export default function Error() {
  return (
    <>
      <Header />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "45vh" }}
      >
        <div className={`${styles.P}`}>
          <p
            className="fw-bold"
            style={{
              fontSize: " 5rem !important",
            }}
          >
            Something went wrong!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
