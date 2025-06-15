import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; 

const MovieRating = ({ rating }) => {
  const maxRating = 10; 

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span key={i}>
          {i <= rating ? (
            <FaStar className="text-warning" /> 
          ) : (
            <FaRegStar className="text-warning" /> 
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="movie-rating d-flex align-items-center">
      <div className="stars">{renderStars()}</div>
      <div className="rating-text ml-2">
        <span>{rating} / {maxRating}</span>
      </div>
    </div>
  );
};

export default MovieRating;
