export default function StarRating({stars}) {
  return (
    <span>
      {[...Array(5)].map((_, index) => {
        if (index < Math.floor(stars)) {
          return <i key={index} className="bi bi-star-fill text-warning"></i>;
        } else if (index < stars) {
          return <i key={index} className="bi bi-star-half text-warning"></i>;
        } else {
          return <i key={index} className="bi bi-star text-warning"></i>;
        }
      })}
    </span>
  );
}
