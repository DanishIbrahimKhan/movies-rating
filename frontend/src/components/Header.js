import React, { useState, useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MyContext } from "../services/myContext";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(MyContext);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSignIn = () => {
    setUser({ ...user, name: "danish", email });
    setShowPopup(false); 
  };

  const handleLogout = () => {
    setUser({}); 
    setEmail("");
  };

  return (
    <>
      <header className="container-fluid py-3 bg-light shadow-sm">
        <div className="row align-items-center justify-content-between mx-3">
          <div className="col-auto">
            <h1 className="text-info fw-bold m-0">Ceenirate</h1>
          </div>
          <div className="col-auto d-flex">
            {user.email ? (
              <>
                <button
                  className="btn btn-info rounded-pill py-2 px-4 d-flex align-items-center me-2"
                  disabled
                >
                  <BsPersonCircle className="me-2" />
                  {user.email}
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger rounded-pill py-2 px-4 d-flex align-items-center me-2"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate(`/favorites`)}
                  className="btn btn-info rounded-pill py-2 px-4 d-flex align-items-center"
                >
                  <FaHeart className="me-2" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowPopup(true)}
                className="btn btn-info rounded-pill py-2 px-4 d-flex align-items-center"
              >
                <BsPersonCircle className="me-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {showPopup && (
        <div
          className="modal d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-content p-4 rounded shadow bg-white">
            <h5 className="mb-3">Enter Your Email</h5>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-info rounded-pill py-2 px-4 d-flex align-items-center me-2"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-info rounded-pill py-2 px-4 d-flex align-items-center"
                onClick={handleSignIn}
                disabled={!email}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
