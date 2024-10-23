module.exports.getRatingObject = (reviewsArray) => {
  let stars = 0;

  if (reviewsArray.length > 0) {
    reviewsArray.forEach((review) => {
      stars += review.stars;
    });

    stars /= reviewsArray.length;

    stars *= 2;

    stars = stars.toFixed() / 2;

    stars = parseFloat(stars);
  }

  const rating = {
    stars: stars,
    reviewsCount: reviewsArray.length,
  };

  return rating;
};
