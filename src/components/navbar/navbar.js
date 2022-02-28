import React from "react";
import logodark from "../../static/navbar/logo-dark.png";
import { Link } from "react-router-dom";
import "./navbar.css";
import bell from "../../static/navbar/bell.png" 
import chat from "../../static/navbar/chat.png"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          <img src={logodark} className="logo" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                GRABIR
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right d-flex">
            <li>
              <Link className="homelink nav-link active" aria-current="page" href="#">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link active" aria-current="page" href="#">
              <img className="chat" src={chat} alt="chat"/>
              </Link>
            </li>
            <li>
              <Link className="nav-link active" aria-current="page" href="#">
                <img className="bell" src={bell} alt="bell"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
