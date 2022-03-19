import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import axios from "axios";
// import { connect } from "react-redux";
import "../login/login2.css";
// import { login } from "../../Store/Actions/auth";
import TextField from "@mui/material/TextField";
import logo from "../landing/assets/img/logo2.svg";
// import Navbar from "../../components/navbar/navbar";
// import { useSelector } from "react-redux";
// import AlreadyLogged from "../../components/NotLoggedIn/AlreadyLogged";
export default function Confirmpass() {
  const history = useHistory();
  const [userForm, setUserForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    emailErr: null,
    passwordErr: null,
    confirmpassErr: null
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
  // const checkConfirmPassword = () => {
  //   if (userForm.password === userForm.confirmpass) {
  //     return true;
  //   } else return false;
  // };
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
      // const samePassword = checkConfirmPassword();
      setUserForm({
        ...userForm,
        confirmpass: e.target.value,
      });
      setErrors({
        ...errors,
        confirmpassErr:
          e.target.value.length === 0
            ? "This field is required"
            : !userForm.password
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
      !errors.passwordErr 
    ) {
      // SEND API REQUEST
      axios
        .post("http://127.0.0.1:8000/base/register/", userForm)
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
    <div className="login">
      {localStorage.getItem("email") ? (
        history.push("/home")
      ) : (
        <>
          <section className="vh-100 bg-image bgImage">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center ">
                  <img src={logo} style={{ width: "40%" }} alt="..." />
                </div>

                <div className="row d-flex justify-content-center align-items-center ">
                  <div className="col-8 col-md-8 col-lg-5 col-xl-6 ">
                    <div className="card" style={{ borderRadius: 15 }}>
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-2">
                            Enter your new password :
                        </h2>

                        <form onSubmit={(e) => submitForm(e)} >
                          <div className="mb-2">
                            <TextField
                              id="PasswordID"
                              className={`form-control ${
                                errors.passwordErr ? "border-danger" : ""
                              }`}
                              label="Password"
                              type="password"
                              // style={{ marginBottom: 5 }}
                              name="password"
                              value={userForm.password}
                              onChange={(e) => changeData(e)}
                              minLength="6"
                              required
                            />

                            <div
                              id="passwordHelp"
                              className="form-text text-danger"
                            >
                              {errors.passwordErr}
                            </div>
                          </div>
                          <div className="mb-2">
                            <TextField
                              id="conpasswordID"
                              type="password"
                              className={`form-control ${
                                errors.confirmpassErr ? "border-danger" : ""
                              }`}
                              label="Password"
                              // style={{ marginBottom: 5 }}
                              name="confirmpassword"
                              value={userForm.confirmpass}
                              onChange={(e) => changeData(e)}
                              required
                            />
                            <div
                              id="conpasswordHelp"
                              className="form-text text-danger"
                            >
                              {errors.confirmpassErr}
                            </div>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              disabled={errors.emailErr || errors.passwordErr}
                              type="submit"
                              className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                            >
                              SUBMIT
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
