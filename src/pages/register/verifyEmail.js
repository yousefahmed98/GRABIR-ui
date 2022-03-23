import React from "react";

export default function verifyEmail() {
  return (
    <div
      class="row container col-lg-12 col-md-12 mb-4 mb-md-0 mx-auto px-10 mb-8"
      style={{ alignItems: "center", width: "80%" }}
    >
      <img
        className="col-lg-10 col-md-10 mb-4 mb-md-0 "
        src="https://img.freepik.com/free-vector/thumb-up-little-men-business-team-successful-startup-contracting-vector-illustration_143808-320.jpg?w=1060"
        // width={50}
        height={600}
      />
      <h2
        className="col-lg-10 col-md-10 mb-4 mb-md-0 "
        style={{ color: "#212529", padding: "4% 10% 4% 10%" }}
      >
        WELCOME TO GRABIR, YOU'RE VERIFIED User!
      </h2>
      <a
        className=" col-lg-10 col-md-10 mb-4 mb-md-0 btn btn-primary btn-xl text-uppercase"
        style={{ marginRight: 20 }}
        href="/home"
      >
        Go To Home
      </a>
    </div>
  );
}
