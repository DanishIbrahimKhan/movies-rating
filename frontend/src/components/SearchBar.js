import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
      navigate("/detail"); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-pill py-2 pl-5 border-secondary"
              placeholder="Search a movie"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-info rounded-pill py-2 px-4 d-flex align-items-center"
              type="button"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
