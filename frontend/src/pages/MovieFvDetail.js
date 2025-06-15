import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaShareAlt,
  FaPlusCircle,
  FaRegBookmark,
  FaCircleNotch,
} from "react-icons/fa";
import { MyContext } from "../services/myContext";

const MovieFvDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const { user } = useContext(MyContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://movie-rating-blue.vercel.app/movie-by-id/${encodeURIComponent(id)}`
        );
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          console.error("Failed to fetch movie details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleUpload = async () => {
    if (!user?.email) {
      alert("Please login first to add to the watchlist.");
      return;
    }
  
    if (!movie) return;
  
    const data = {
      imdbID: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      rating: movie.imdbRating,
      poster: movie.Poster,
      userEmail: user.email,
    };
  
    try {
      const checkResponse = await fetch(
        `http://localhost:9000/favorites?imdbID=${encodeURIComponent(
          movie.imdbID
        )}&userEmail=${encodeURIComponent(user.email)}`
      );
  
      if (checkResponse.ok) {
        const existingMovies = await checkResponse.json();
  
        if (existingMovies.length > 0) {
          alert("Movie already exists in your watchlist.");
          return;
        }
      } else {
        console.error(
          "Failed to check if movie exists:",
          checkResponse.statusText
        );
        alert("Error checking existing watchlist.");
        return;
      }
  
      const uploadResponse = await fetch("http://localhost:9000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (uploadResponse.ok) {
        const result = await uploadResponse.json();
        console.log("Data uploaded successfully:", result);
        alert("Movie added to your watchlist successfully!");
      } else {
        console.error("Failed to upload data:", uploadResponse.statusText);
        alert("Failed to add the movie to the watchlist.");
      }
    } catch (error) {
      console.error("Error handling upload:", error);
      alert("An error occurred while adding the movie to the watchlist.");
    }
  };
  

  const handleWatchlistClick = () => {
    setIsAddedToWatchlist(!isAddedToWatchlist);
  };

  const handleShareClick = () => {
    if (!movie) return;

    const shareText = `${movie.Title} (${movie.Year})\nRating: ${movie.imdbRating} IMDb\nGenre: ${movie.Genre}\nReleased: ${movie.Released}\n\n${movie.Plot}`;
    alert(`Sharing movie details: \n\n${shareText}`);
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <FaCircleNotch className="text-primary mb-4 spin" size={60} />
        <h4>Loading movie details...</h4>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h4>Movie details not found!</h4>
      </div>
    );
  }

  const {
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
    Website,
  } = movie;

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
              <h1 className="card-title text-primary mb-3" style={{ fontWeight: "bold" }}>
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
                <li><strong>Rated:</strong> {Rated}</li>
                <li><strong>Released:</strong> {Released}</li>
                <li><strong>Runtime:</strong> {Runtime}</li>
                <li><strong>Genre:</strong> {Genre}</li>
                <li><strong>Director:</strong> {Director}</li>
                <li><strong>Writer:</strong> {Writer}</li>
                <li><strong>Actors:</strong> {Actors}</li>
                <li><strong>Language:</strong> {Language}</li>
                <li><strong>Country:</strong> {Country}</li>
                <li><strong>Awards:</strong> {Awards}</li>
              </ul>
              <h4 className="mt-4">Plot</h4>
              <p className="text-muted">{Plot}</p>
              <h4 className="mt-4">Ratings</h4>
              {Ratings?.length ? (
                Ratings.map((rating, index) => (
                  <p key={index}>
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </p>
                ))
              ) : (
                <p>No additional ratings available.</p>
              )}
              <div className="d-flex justify-content-between mt-4">
                {/* <button
                  className={`btn ${isAddedToWatchlist ? "btn-success" : "btn-info"}`}
                  onClick={handleUpload}
                >
                  <FaPlusCircle className="mr-2" />
                  Add to Watchlist
                </button> */}
                <button className="btn btn-info" onClick={handleShareClick}>
                  <FaShareAlt className="mr-2" />
                  Share
                </button>
              </div>
              <div className="mt-4">
                <p><strong>Box Office:</strong> {BoxOffice || "N/A"}</p>
                <p><strong>Website:</strong> {Website || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFvDetail;
