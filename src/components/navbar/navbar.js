import React from "react";
import logo from "../../static/navbar/logo-default.png";
import logodark from "../../static/navbar/logo-dark.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="" width="50px" height="55px" />
        </a>
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
          <ul className="d-flex">
              <li>
              <Link className="nav-link active" aria-current="page" href="#">
                Home1
              </Link>
              </li>
              <li>
              <Link className="nav-link active" aria-current="page" href="#">
                Home2
              </Link>
              </li>
              <li>
              <Link className="nav-link active" aria-current="page" href="#">
                Home3
              </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;