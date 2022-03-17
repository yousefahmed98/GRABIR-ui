import React from "react";
import NotLoggedIn from "../components/NotLoggedIn/NotLoggedIn";
export default function Test() {
  console.log(localStorage.getItem("email"));
  return (
    <>

  { localStorage.getItem("email") ? (
    <div><h1>iam logged in</h1></div>
  ) : <NotLoggedIn/>}
    </>
  );
}
