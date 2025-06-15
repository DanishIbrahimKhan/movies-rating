import React from "react";

const Home = () => {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="text-center">
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Search for Your Favorite <span style={{ color: "#17a2b8" }}>Movies</span>
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#555",
            maxWidth: "600px",
            margin: "1rem auto",
          }}
        >
          Explore a world of cinema with our easy-to-use search platform. Find details, ratings, and more in just a few clicks!
        </p>
      </div>

    </div>
  );
};

export default Home;
