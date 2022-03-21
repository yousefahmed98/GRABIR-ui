import React from "react";
export default function myInput(props) {
  return (
    <div className="mb-3 ">
      <label htmlFor={props.id} className="form-label">{props.label}</label>
      <input type={props.type} className={`form-control ${props.errors ? "border-danger" : ""}`} id={props.id} aria-describedby="emailHelp"
        value={props.value} onChange={(e) => props.handleChange(e)}  name={props.name}/>
      <div id={props.id} className="form-text text-danger" >{props.errors}</div>
    </div>

  );
}
