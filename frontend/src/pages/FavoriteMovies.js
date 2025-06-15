import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { MyContext } from "../services/myContext";
import { FaHeart } from "react-icons/fa";


const FavoriteMovies = () => {
  const { user, setUser } = useContext(MyContext);

  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/favorites/${user.email}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);
  const handleBook = () => {
    console.log("Booking ticket...");
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <h1 className="text-info"> Favorite Movies </h1>{" "}
      </div>
      <div className="row">
        {favorites.map((favorites) => (
          <Card
            key={favorites._id}
            title={favorites.title}
            poster={favorites.poster}
            rating={favorites.rating}
            description={favorites.description}
            price={favorites.price}
            onBook={handleBook}
            onClick={() => navigate(`/details/${favorites.imdbID}`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
