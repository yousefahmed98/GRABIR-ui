import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logodark from "../../static/navbar/logo-dark.png";
import logo from "../../static/navbar/logo-default.png";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const history = useHistory();
  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    phone_number: "",
    region: "",
  });

  const [errors, setErrors] = useState({
    firstnameErr: null,
    lastnameErr: null,
    emailErr: null,
    usernameErr: null,
    passwordErr: null,
    confirmpassErr: null,
    all_registerErr: null,
    phone_numberErr: null,
    regionErr: null,
  });
  const validateEmail = (userOption) => {
    let checker = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return checker.test(userOption);
  };
  const validatePassword = (userOption) => {
    let checker =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return checker.test(userOption);
  };

  const hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
  };
  const checkConfirmPassword = () => {
    if (userForm.password === userForm.confirmpass) {
      return true;
    } else return false;
  };
  const changeData = (e) => {
    if (e.target.name === "email") {
      const isEmail = validateEmail(e.target.value);
      setUserForm({
        ...userForm,
        email: e.target.value,
      });
      setErrors({
        ...errors,
        emailErr:
          e.target.value.length === 0
            ? "This field is required"
            : !isEmail
            ? "Invalid Email Format"
            : null,
      });
    } else if (e.target.name === "password") {
      const isPassword = validatePassword(e.target.value);
      setUserForm({
        ...userForm,
        password: e.target.value,
      });
      setErrors({
        ...errors,
        passwordErr:
          e.target.value.length === 0
            ? "This field is required"
            : !isPassword
            ? "Invalid! Password Should contain atleast 8 characters --> one UpperCase, LowerCase, digit and special character"
            : null,
      });
    } else if (e.target.name === "firstname") {
      setUserForm({
        ...userForm,
        first_name: e.target.value,
      });
      setErrors({
        ...errors,
        firstnameErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "lastname") {
      setUserForm({
        ...userForm,
        last_name: e.target.value,
      });
      setErrors({
        ...errors,
        lastnameErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "username") {
      const has_WhiteSpace = hasWhiteSpace(e.target.value);
      setUserForm({
        ...userForm,
        username: e.target.value,
      });
      setErrors({ 
        ...errors,
        usernameErr:
          e.target.value.length === 0
            ? "This field is required"
            : has_WhiteSpace
            ? "Invalid Format! Username does not have spaces"
            : null,
      });
    } else if (e.target.name === "confirmpassword") {
      const samePassword = checkConfirmPassword();
      setUserForm({
        ...userForm,
        confirmpass: e.target.value,
      });
      setErrors({
        ...errors,
        confirmpassErr:
          e.target.value.length === 0
            ? "This field is required"
            : !samePassword
            ? "Does not match password!"
            : null,
      });
    } else if (e.target.name === "phonenumber") {
      setUserForm({
        ...userForm,
        phone_number: e.target.value,
      });
      setErrors({
        ...errors,
        phone_numberErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "region") {
      setUserForm({
        ...userForm,
        region: e.target.value,
      });
      setErrors({
        ...errors,
        regionErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      !errors.emailErr &&
      !errors.passwordErr &&
      !errors.usernameErr &&
      !errors.firstnameErr &&
      !errors.lastnameErr &&
      !errors.phone_numberErr &&
      !errors.regionErr
    ) {
      // SEND API REQUEST
      axios
        .post("http://127.0.0.1:8000/base/users/", userForm)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      return history.push("/login");

    } else {
      return setErrors({
        ...errors,
        all_registerErr: "something went error!",
      });
    }
  };

  return (
    <>
      {/* NAVBAR SECTION */}
      <nav className="navbar navbar-light bg-light">
        <div className="ms-3">
          <Link className="navbar-brand" to="/test">
            <img src={logodark} alt="GRABIRLOGO" />
          </Link>
        </div>
      </nav>
      {/*END NAVBAR SECTION */}
      <div className="container text-light ">
        <div className="row">
          {/* LEFT */}
          <div className="col-8 mainPage">
            <h3 className="mb-3 mt-1 headTitle">REGISTER</h3>
            {/* START OF FORM  */}
            <form onSubmit={(e) => submitForm(e)} className="col-8">
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-2 mr-5">
                <label htmlFor="exampleInputUser1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameID"
                  aria-describedby="userHelp"
                  value={userForm.username}
                  onChange={(e) => changeData(e)}
                  name="username"
                />
                <div id="usernameHelp" className="form-text text-danger">
                  {errors.usernameErr}
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-2 mr-5">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    errors.emailErr ? "border-danger" : ""
                  }`}
                  id="EmailID"
                  aria-describedby="emailHelp"
                  value={userForm.email}
                  onChange={(e) => changeData(e)}
                  name="email"
                />
                <div id="emailHelp" className="form-text text-danger">
                  {errors.emailErr}
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-2 mr-5">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.passwordErr ? "border-danger" : ""
                  }`}
                  id="PasswordID"
                  name="password"
                  value={userForm.password}
                  onChange={(e) => changeData(e)}
                />
                <div id="passwordHelp" className="form-text text-danger">
                  {errors.passwordErr}
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-2 mr-5">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmpassErr ? "border-danger" : ""
                  }`}
                  id="conpasswordID"
                  name="confirmpassword"
                  value={userForm.confirmpass}
                  onChange={(e) => changeData(e)}
                />
                <div id="conpasswordHelp" className="form-text text-danger">
                  {errors.confirmpassErr}
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-2 mr-5">
                <label htmlFor="exampleInputFirstname1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstnameID"
                  aria-describedby="firstnameHelp"
                  value={userForm.first_name}
                  onChange={(e) => changeData(e)}
                  name="firstname"
                />
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-2 mr-5">
                <label htmlFor="exampleInputLastname1" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastnameID"
                  aria-describedby="lastnameHelp"
                  value={userForm.last_name}
                  onChange={(e) => changeData(e)}
                  name="lastname"
                />
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-2 mr-5">
                <label htmlFor="exampleInputPhone1" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneID"
                  aria-describedby="phoneHelp"
                  value={userForm.phone_number}
                  onChange={(e) => changeData(e)}
                  name="phonenumber"
                />
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <div className="mb-4 mr-5">
                <label htmlFor="exampleInputRegion1" className="form-label">
                  Region
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regionID"
                  aria-describedby="regionHelp"
                  value={userForm.region}
                  onChange={(e) => changeData(e)}
                  name="region"
                />
              </div>
              <div className="text-danger">{errors.all_registerErr}</div>
              <div className="row">
                <button
                  disabled={errors.emailErr || errors.passwordErr}
                  type="submit"
                  className="btn submitbtn ms-3 col-6"
                >
                  Register
                </button>
                <p className="ms-6 col-5">already have an account?</p>
              </div>
            </form>
          </div>
          {/* RIGHT */}
          <div className="col-4 describtion">
            <img src={logo} className="logo" alt="logoimage" />
            <h3 className="mb-5 mt-2 ms-5 headTitle">GRABIR</h3>
          </div>
        </div>
      </div>
    </>
  );
}
