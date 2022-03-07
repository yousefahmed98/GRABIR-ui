import React from "react";
import Navbar from "../navbar/navbar";
import laptop from "../../static/laptop.jpeg";
import "./landing_page.css";

export default function LandingPage() {
    document.body.style.backgroundColor = "white" ;
  return (
    <>
      <Navbar />

      <div className="text-center">
        <h1><img src={laptop} alt="laptop" className=""/></h1>
      </div>

      <div className="row">
        <div className="col-12 mt-5 text-dark text-center">
          <h3>What is GRABIR ?</h3>
        </div>
        <div className="row">
          <div className="offset-4 col-4 mt-5 text-dark text-center">
            <h4 className="describtionText">
              Grabir is one of the delivery platforms worldwide. In 2022 with
              Grabir, you will save your money when you need anything from
              abroad and don't need to pay a lot of money in this process to get
              something from another country. Grabir provides a true request of
              anything from anywhere abroad, only possible by our huge users who
              are traveled and exist everywhere all over the world.
            </h4>
          </div>
        </div>
        <div className="text-center">
        <button className="btn btn-dark btn-lg mt-3">Know More About Us</button>
        </div>
      </div>
    </>
  );
}
