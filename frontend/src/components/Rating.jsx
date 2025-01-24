import React from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

const Rating = ({ rating }) => {
  return (
    <div className="rating-container">
      {new Array(5).fill(0).map((_, i) => {
        const index = i + 1;

        return index <= rating ? (
          <FaStar className="active-star" />
        ) : index - rating >= 1 ? (
          <FaStar className="inactive-star" />
        ) : (
          <FaStarHalfStroke className="active-star" />
        );
      })}
    </div>
  );
};

export default Rating;
