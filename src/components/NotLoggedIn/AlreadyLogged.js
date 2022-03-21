import React from "react";
import { Link } from "react-router-dom";

export default function AlreadyLogged() {
  return (
    <>
      <div className="text-center pt-5">
        <h1 className="text-light">You are Logged</h1>
        <Link className="btn btn-info" to="/home">
          Home
        </Link>
      </div>
    </>
  );
}
