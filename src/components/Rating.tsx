import React, { useState } from "react";
// import { Star } from "../components/Star";

interface Rating {
  totalStars: number;
}
export const StarRating = ({ totalStars }: Rating) => {
  const [SelectedStar, setSelectedStar] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <div key={i} className={i > SelectedStar ? "star selected" : "star"}
          onClick={() => setSelectedStar(i - 1)}
        />
      ))}
    </div>
  );
};