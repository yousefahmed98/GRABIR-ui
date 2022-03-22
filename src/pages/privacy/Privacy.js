import React from "react";
import "./Privacy.css";
import { Link } from "react-router-dom";
export default function Privacy() {
  return (
    <div className="p-4 container-fluid bg-light fullpage text-center">
      <h2 className="text-primary">Privacy Policy of GRABIR</h2>
      <p>This Application collects some Personal Data from its Users.</p>
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
      <h4>
        Personal Data processed for the following purposes and using the
        following services:
      </h4>
      <h6 className="text-secondary">Registration and authentication</h6>
      <ul  className="text-secondary list-group">
        <li>Pay with PayPal</li>
        <li>Personal Data: various types of Data as specified</li>
        <li>the privacy policy of the service </li>
      </ul> 
      <hr></hr>
      <h4>Contact information</h4>
      <h6>Owner and Data Controller</h6>
      <p>Grabir Egypt</p>
      <ul>
        <li>Owner contact email: grabiremail@gmail.com</li>
      </ul>
      <br></br>
      <hr></hr>
      <div>
        <small>Latest update: March 22, 2022</small>
      </div>
      <div>
        <small>
          GRABIR hosts this content and only collects the Personal Data strictly
          necessary for it to be provided.
        </small>
      </div>

      <Link className="mt-2 btn btn-primary" to="/">
        Back to GRABIR
      </Link>
    </div>
  );
}
