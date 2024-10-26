import StarRating from "../StarRating/StarRating";
export default function Reviews({stars = 4.5 , username , feedback = "very cool" , date = "14 july 2021"}) {
  return (
    <>
      <div className="col-md-12 ">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between">
            <div className="stars" style={{ maxWidth: "50%" }}>
              <StarRating stars={stars} />
            </div>
            <small className="text-black-50 text-end ">{date === "Date not available" ? "14 july 2021" : date}</small>
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
