import React, { useContext, useState } from "react";
import {
  FaStar,
  FaShareAlt,
  FaPlusCircle,
  FaRegBookmark,
  FaCircleNotch,
} from "react-icons/fa";
import { MyContext } from "../services/myContext";

const MovieDetailPage = ({
  imdbID,
  Title,
  Year,
  Rated,
  Released,
  Runtime,
  Genre,
  Director,
  Writer,
  Actors,
  Plot,
  Language,
  Country,
  Awards,
  Poster,
  Ratings,
  imdbRating,
  imdbVotes,
  BoxOffice,
  website,
}) => {
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { user } = useContext(MyContext);

  const handleUpload = async () => {
    if (!user?.email) {
      setShowLoginPopup(true);
      return;
    }

    const data = {
      imdbID: imdbID,
      title: Title,
      year: Year,
      rating: imdbRating,
      poster: Poster,
      userEmail: user.email,
    };

    try {
      const response = await fetch("http://localhost:9000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data uploaded successfully:", result);
        alert("Data uploaded successfully!");
      } else {
        console.error("Failed to upload data:", response.statusText);
        alert("Failed to upload data.");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data.");
    }
  };

  const handleShareClick = () => {
    const shareText = `${Title} (${Year})\nRating: ${imdbRating} IMDb\nGenre: ${Genre}\nReleased: ${Released}\n\n${Plot}`;
    alert(`Sharing movie details: \n\n${shareText}`);
  };

  if (!Title) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <FaCircleNotch className="text-primary mb-4 spin" size={60} />
        <h4>Loading movie details...</h4>
      </div>
    );
  } else {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <img
              src={Poster}
              alt={`${Title} Poster`}
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="card border-0 shadow-lg rounded">
              <div className="card-body">
                <h1
                  className="card-Title text-primary mb-3"
                  style={{ fontWeight: "bold" }}
                >
                  {Title} <small>({Year})</small>
                </h1>
                <div className="d-flex align-items-center mb-3">
                  <FaStar className="text-warning" size={20} />
                  <span className="ml-2">
                    <strong>{imdbRating}</strong> / 10
                  </span>
                  <span className="text-muted ml-2">({imdbVotes} votes)</span>
                </div>
                <ul className="list-unstyled mb-3">
                  <li>
                    <strong>Rated:</strong> {Rated}
                  </li>
                  <li>
                    <strong>Released:</strong> {Released}
                  </li>
                  <li>
                    <strong>Runtime:</strong> {Runtime}
                  </li>
                  <li>
                    <strong>Genre:</strong> {Genre}
                  </li>
                  <li>
                    <strong>Director:</strong> {Director}
                  </li>
                  <li>
                    <strong>Writer:</strong> {Writer}
                  </li>
                  <li>
                    <strong>Actors:</strong> {Actors}
                  </li>
                  <li>
                    <strong>Language:</strong> {Language}
                  </li>
                  <li>
                    <strong>Country:</strong> {Country}
                  </li>
                  <li>
                    <strong>Awards:</strong> {Awards}
                  </li>
                </ul>
                <h4 className="mt-4">Plot</h4>
                <p className="text-muted">{Plot}</p>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className={`btn ${
                      isAddedToWatchlist ? "btn-success" : "btn-info"
                    }`}
                    onClick={handleUpload}
                  >
                    <FaPlusCircle className="mr-2" />
                    Add to Watchlist
                  </button>
                  <button className="btn btn-info" onClick={handleShareClick}>
                    <FaShareAlt className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showLoginPopup && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Login Required</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowLoginPopup(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Please login to add movies to your watchlist.</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowLoginPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default MovieDetailPage;
