import React from "react";
import "./register.css"

export default function verifyEmail() {
  return (
    <div
      className="container text-center"
      style={{ alignItems: "center", width: "80%" }}
    >
      <img
        className=" verifyimg"
        src="https://img.freepik.com/free-vector/thumb-up-little-men-business-team-successful-startup-contracting-vector-illustration_143808-320.jpg?w=1060"
        // width={50}
        // height={600}
        
      />
      <h2
        className=" text-center"
        style={{ color: "#212529", padding: "4% 0", fontSize: "100%" }}
      >
        WELCOME TO GRABIR, YOU'RE VERIFIED User!
      </h2>
      <a
        className="col-10 btn btn-primary btn-xl text-uppercase"
        style={{ marginRight: 20 }}
        href="/login"
      >
        Go To Login
      </a>
    </div>
  );
}
