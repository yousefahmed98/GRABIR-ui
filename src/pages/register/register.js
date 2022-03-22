import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../login/login2.css";
import TextField from "@mui/material/TextField";
import logo from "../landing/assets/img/logo2.svg";
export default function Register() {
  const history = useHistory();
  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
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

  const validateName = (userOption) => {
    let checker = /^[a-z ,.'-]+$/i;
    return checker.test(userOption);
  };
  const hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
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
      const isFname = validateName(e.target.value);
      setUserForm({
        ...userForm,
        first_name: e.target.value,
      });
      setErrors({
        ...errors,
        firstnameErr:
          e.target.value.length === 0
            ? "This field is required"
            : e.target.value.length < 3
            ? "First Name should be at least 3 Characters"
            : !isFname
            ? "Invalid Name Format Shouldn't Containt special characters of numbers"
            : null,
      });
    } else if (e.target.name === "lastname") {
      const isLastName = validateName(e.target.value);
      const has_WhiteSpace = hasWhiteSpace(e.target.value);
      setUserForm({
        ...userForm,
        last_name: e.target.value,
      });
      setErrors({
        ...errors,
        lastnameErr:
        e.target.value.length === 0
        ? "This field is required"
        : e.target.value.length < 3
        ? "LastName must be more than 2 letters"
        : !isLastName
        ? "Invalid name Format"
        : has_WhiteSpace
        ? "You should not include spaces"
        : null,
      });
    } else if (e.target.name === "username") {
      const has_WhiteSpace = hasWhiteSpace(e.target.value);
      const isUsername = validateName(e.target.value);
      setUserForm({
        ...userForm,
        username: e.target.value,
      });
      setErrors({
        ...errors,
        usernameErr:
        e.target.value.length === 0
        ? "Username field is required and shouldn't include Number or *&;'/_-=$#@!"
        : e.target.value.length < 3
        ? "Username must be more than 2 Characters"
        : !isUsername
        ? "Invalid username Format, Can't include number or *&;'/_-=$#@! "
        : has_WhiteSpace
        ? "Invalid format! Username does not have spaces!"
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
            : e.target.value != userForm.password
            ? "Does not match password!"
            : null,
      });
      // } else if (e.target.name === "phonenumber") {
      //   setUserForm({
      //     ...userForm,
      //     phone_number: e.target.value,
      //   });
      //   setErrors({
      //     ...errors,
      //     phone_numberErr:
      //       e.target.value.length === 0 ? "This field is required" : null,
      //   });
    } else if (e.target.name === "region") {
      const isRegion = validateName(e.target.value);
      setUserForm({
        ...userForm,
        region: e.target.value,
      });
      setErrors({
        ...errors,
        regionErr:
          e.target.value.length === 0
            ? "This field is required"
            : e.target.value.length === 1 || e.target.value == " "
            ? "Region must be more at least two characters and not a space"
            : !isRegion
            ? "Invalid Region Format"
            : e.target.value.trim().length === 0
            ? "Invalid foramt, required a meaningful value!"
            : null,
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
      !errors.regionErr
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
                          REGISTER
                        </h2>

                        <form onSubmit={(e) => submitForm(e)}>
                          <div className="mb-2">
                            <TextField
                              id="usernameID"
                              className="form-control"
                              label="Username"
                              type="text"
                              // style={{ marginBottom: 5 }}
                              value={userForm.username}
                              onChange={(e) => changeData(e)}
                              name="username"
                              required
                            />
                            <div
                              id="usernameHelp"
                              className="form-text text-danger"
                            >
                              {errors.usernameErr}
                            </div>
                          </div>
                          <div className="mb-2">
                            <TextField
                              id="EmailID"
                              className={`form-control ${
                                errors.emailErr ? "border-danger" : ""
                              }`}
                              label="Email"
                              type="email"
                              // style={{ marginBottom: 5 }}
                              name="email"
                              value={userForm.email}
                              onChange={(e) => changeData(e)}
                              minLength="6"
                              required
                            />
                            <div
                              id="emailHelp"
                              className="form-text text-danger"
                            >
                              {errors.emailErr}
                            </div>
                          </div>
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
                          <div className="mb-2">
                            <TextField
                              id="firstnameID"
                              className="form-control"
                              label="First name"
                              type="text"
                              // style={{ marginBottom: 5 }}
                              value={userForm.first_name}
                              onChange={(e) => changeData(e)}
                              name="firstname"
                              required
                            />
                          </div>
                          <div>
                            <p className="text-danger">
                              {" "}
                              {errors.firstnameErr}
                            </p>
                          </div>
                          <div className="mb-2">
                            <TextField
                              id="lastnameID"
                              className="form-control"
                              label="Last name"
                              type="text"
                              // style={{ marginBottom: 5 }}
                              value={userForm.last_name}
                              onChange={(e) => changeData(e)}
                              name="lastname"
                              required
                            />
                          </div>
                          <div>
                            <p className="text-danger"> {errors.lastnameErr}</p>
                          </div>
                          {/* <div className="mb-2">
                            <TextField
                              id="phoneID"
                              className="form-control"
                              label="Phone number"
                              type="text"
                              // style={{ marginBottom: 5 }}
                              value={userForm.phone_number}
                              onChange={(e) => changeData(e)}
                              name="phonenumber"
                              required
                            />
                          </div> */}
                          <div className="mb-2">
                            <TextField
                              id="regionID"
                              className="form-control"
                              label="Region"
                              type="text"
                              // style={{ marginBottom: 5 }}
                              value={userForm.region}
                              onChange={(e) => changeData(e)}
                              name="region"
                              required
                            />
                          </div>
                          <div>
                            <p className="text-danger"> {errors.regionErr}</p>
                          </div>
                          <div className="text-danger">
                            {errors.all_registerErr}
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              disabled={
                                errors.emailErr ||
                                errors.passwordErr ||
                                errors.firstnameErr ||
                                errors.lastnameErr ||
                                errors.regionErr ||
                                errors.confirmpassErr ||
                                errors.usernameErr
                              }
                              type="submit"
                              className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                            >
                              Register
                            </button>
                          </div>

                          <p className="text-center text-muted">
                            Already have an account?{" "}
                            <a href="/login" className="fw-bold text-body">
                              <u>Login here!</u>
                            </a>
                          </p>
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
