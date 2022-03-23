import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../privacy/Privacy.css";

export default function Partners() {
  return (
    <div className="fullpage">
      <div className="container text-center">
        <h1 className="text-center text-primary pt-5">Our Future Partners</h1>
        <br></br>
        <br></br>
        <hr></hr>
        <br></br>
        <h4>Google</h4>
        <ul className="text-secondary list-group">
          <li>
            Google LLC is an American multinational technology company that
            specializes in Internet-related services and products
          </li>
          <li>
            , which include a search engine, online advertising technologies,
            cloud computing, software, and hardware
          </li>
          <li>
            {" "}
            It is considered one of the Big Five American information technology
            companies,{" "}
          </li>
        </ul>
        <hr></hr>
        <h4>IBM</h4>
        <ul className="text-secondary list-group">
          <li>
            IBM is an American multinational technology company that specializes
            in Internet-related services and products
          </li>
          <li>
            , which include a search engine, online advertising technologies,
            cloud computing, software, and hardware
          </li>
          <li>
            {" "}
            It is considered one of the Big Five American information technology
            companies,{" "}
          </li>
        </ul>
        <hr></hr>
        <h4>Microsoft</h4>
        <ul className="text-secondary list-group">
          <li>
            Microsoft is an American multinational technology company that
            specializes in Internet-related services and products
          </li>
          <li>
            , which include a search engine, online advertising technologies,
            cloud computing, software, and hardware
          </li>
          <li>
            {" "}
            It is considered one of the Big Five American information technology
            companies,{" "}
          </li>
        </ul>
        <hr></hr>
        <h4>LinkedIN</h4>
        <ul className="text-secondary list-group">
          <li>
            LinkedIN is an American multinational technology company that
            specializes in Internet-related services and products
          </li>
          <li>
            , which include a search engine, online advertising technologies,
            cloud computing, software, and hardware
          </li>
          <li>
            {" "}
            It is considered one of the Big Five American information technology
            companies,{" "}
          </li>
        </ul>
        <hr></hr>
        <div>
          <small>Latest update: March 22, 2022</small>
        </div>
        <div>
          <small>
            GRABIR hosts this content and only collects the Personal Data
            strictly necessary for it to be provided.
          </small>
        </div>
        <Link className="mt-2 btn btn-primary" to="/">
          Back to GRABIR
        </Link>
      </div>
    </div>
  );
}
