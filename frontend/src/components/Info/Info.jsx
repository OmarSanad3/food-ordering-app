import StarRating from "../StarRating/StarRating";
export default function Info({name , cheapestMealPrice , deliveryTime , stars , tags}) {
  return (
    <div className="col-md-12 col-lg-9">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between">
          <h2 className="mb-3">{name}</h2>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Minmum Order Amount :</p>
          <span>EGP {cheapestMealPrice}.00</span>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Delivery Time </p>
          <span>{deliveryTime} mins</span>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Pre-Order </p>
          <span>No</span>
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Rating</p>
            <StarRating stars={stars} />
        </div>
        <hr />
        <div className="col-md-12 d-flex justify-content-between">
          <p className="fs-5 ">Cuisines</p>
          <span>
            {tags.map((tag , index) => {
              return (
                <span key = {index} className="me-2">
                  {tag}
                </span>
              );
            })}

          </span>
        </div>
      </div>
      <hr />
    </div>
  );
}
