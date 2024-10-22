export default function Reviews({stars = 4.5 , username = "zyad elanghy" , feedback = "very cool" , date = "14 july 2021"}) {
  return (
    <>
      <div className="col-md-12 ">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between">
            <div className="stars" style={{ maxWidth: "50%" }}>
            {[...Array(5)].map((_, index) => {
                if (index < Math.floor(stars)) {
                  return (
                    <i key={index} className="bi bi-star-fill text-warning"></i>
                  );
                } else if (index < stars) {
                  return (
                    <i key={index} className="bi bi-star-half text-warning"></i>
                  );
                } else {
                  return (
                    <i key={index} className="bi bi-star text-warning"></i>
                  );
                }
              })}
            </div>
            <small className="text-black-50 text-end ">{date}</small>
          </div>
        </div>
        <div className="d-flex align-items-center w-100">
          <div className="name text-black-50 ps-3 ">{username}</div>
        </div>
        <div className="comment">
          <p className="fs-5">{feedback} </p>
        </div>
        <hr />
      </div>
    </>
  );
}
