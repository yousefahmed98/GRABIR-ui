import React from "react";
import Navbar from "../navbar/navbar";
import laptop from "../../static/laptop.jpeg";
import item1 from "../../static/item1.png"
import item2 from "../../static/item2.png"
import item3 from "../../static/item3.png"
import "./landing_page.css";

export default function LandingPage() {
  document.body.style.backgroundColor = "white";
  return (
    <>
      <Navbar />

      <div className="text-center laptopContainer">
        <h1>
          <img src={laptop} alt="laptop" className="" />
        </h1>
      </div>

      <div className="row">
        <div className="col-12 mt-5 text-dark text-center headerText">
          <h3>What is GRABIR ?</h3>
        </div>
        <div className="row">
          <div className="offset-2 col-8 mt-5 text-dark text-center">
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
          <button className="btn btn-dark btn-lg mt-3">
            Know More About Us
          </button>
        </div>
      </div>
      <div className="row mt-5 mb-5">
        <div className="border border-4 rounded-pill offset-2 col-8 text-center">
          <p className="mt-3 itemdescribtion" >We deliver on time without any taxes</p>
          <div className="row mb-2">
            <div className="col-4"><img src={item1} className="items3" alt="item1"/></div>
            <div className="col-4"><img src={item2} className="items3" alt="item2"/></div>
            <div className="col-4"><img src={item3} className="items3" alt="item3"/></div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h1>footer</h1>
      </div>
    </>
  );
}
