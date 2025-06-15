import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { MyContext } from "./services/myContext";
import FavoriteMovies from "./pages/FavoriteMovies";
import MovieFvDetail from "./pages/MovieFvDetail";
import MovieDetailPage from "./pages/MovieDetailPage";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { name: "", email: "" };
  });
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleSearch = async (query) => {
    setError(null);
    setMovieData(null);

    try {
      const response = await fetch(
        `https://movie-rating-blue.vercel.app/movie-by-title/${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        setMovieData(data);
      } else {
        setError(data.error || "Movie not found");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <MyContext.Provider value={{ user, setUser }}>
      <Router>
        <div>
          <Header />
          <SearchBar onSearch={handleSearch} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<MovieDetailPage {...movieData} />} />
            <Route path="/details/:id" element={<MovieFvDetail />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
          </Routes>
        </div>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
