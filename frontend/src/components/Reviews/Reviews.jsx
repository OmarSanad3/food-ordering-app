export default function Reviews() {
  return (
    <>
      <div className="col-md-12 col-lg-9">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between">
            <div className="stars" style={{ maxWidth: "10%" }}>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
            </div>
            <small className="text-black-50 text-end ">14 October 2024</small>
          </div>
        </div>
        <div className="d-flex align-items-center w-100">
          <div className="name text-black-50 ps-3 ">Ahmed</div>
        </div>
        <div className="comment">
          <p className="fs-5"> So cuteeee </p>
        </div>
        <hr />
      </div>
    </>
  );
}
