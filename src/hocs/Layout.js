import React from "react";
import Navbar from "../components/navbar/navbar";

export default function Layout(props) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}
