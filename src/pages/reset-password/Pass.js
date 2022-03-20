import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import "../login/login2.css"
import TextField from "@mui/material/TextField"
import logo from "../landing/assets/img/logo2.svg"
export default function Pass() {
  const history = useHistory();
  const [userForm, setUserForm] = useState({
    email: null,
    redirect_url: "http://localhost:3000/confirm",
  });

  const [errors, setErrors] = useState({
    emailErr: null
  });
  const validateEmail = (userOption) => {
    let checker = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return checker.test(userOption);
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
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!errors.emailErr) {
      // SEND API REQUEST
      return axios
        .post("http://127.0.0.1:8000/base/request-reset-email/", userForm)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      // return history.push("/login");
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
                          Enter your email :
                        </h2>

                        <form onSubmit={(e) => submitForm(e)}>
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

                          <div className="d-flex justify-content-center">
                            <button
                              disabled={errors.emailErr || errors.passwordErr}
                              type="submit"
                              className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                            >
                              SEND
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
