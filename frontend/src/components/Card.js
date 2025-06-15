import React from 'react';
import MovieRating from './MovieRating';

const Card = ({ title, description, rating, onClick, poster }) => {
  return (
    <div className="col-md-4 col-sm-12 mb-4" onClick={onClick}>
      <div className="card shadow-sm rounded">
        <img
          src={poster}
          className="card-img-top rounded-top"
          alt="Movie Poster"
        />
        <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </h5>
          
          {rating && <MovieRating rating={rating} />}
          <p
            className="card-text"
            style={{
              fontSize: '0.9rem',
              color: '#555',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
