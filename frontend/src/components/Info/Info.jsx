export default function Info() {
  return (
    <div className="col-md-12 col-lg-9">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between">
          <h2 className="mb-3">Crep Town</h2>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Minmum Order Amount :</p>
          <span>EGP 20.00</span>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Delivery Time </p>
          <span>16 mins</span>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Pre-Order </p>
          <span>No</span>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Rating</p>
          <span>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
          </span>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Cuisines</p>
          <span>Desserts, Beverages, Waffles</span>
        </div>
      </div>
      <hr />
    </div>
  );
}
