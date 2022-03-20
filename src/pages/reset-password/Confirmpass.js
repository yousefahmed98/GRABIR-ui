import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../login/login2.css";
import TextField from "@mui/material/TextField";
import logo from "../landing/assets/img/logo2.svg";
import { useLocation } from "react-router-dom";

export default function Confirmpass() {
  const history = useHistory();
  const search = useLocation().search;
  const token_valid_param = new URLSearchParams(search).get("token_valid");
  const uidb64_param = new URLSearchParams(search).get("uidb64");
  const token_param = new URLSearchParams(search).get("token");
  const [userForm, setUserForm] = useState({
    token_valid: null,
    uidb64: null,
    password: null,
  });

  const [errors, setErrors] = useState({
    passwordErr: null,
  });

  const validatePassword = (userOption) => {
    let checker =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return checker.test(userOption);
  };

  const changeData = (e) => {
    if (e.target.name === "password") {
      const isPassword = validatePassword(e.target.value);
      setUserForm({
        ...userForm,
        token: token_param,
        uidb64: uidb64_param,
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
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!errors.passwordErr) {
      // SEND API REQUEST
      axios
        .patch("http://127.0.0.1:8000/base/set-pass/", userForm)
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

                        <form onSubmit={(e) => submitForm(e)}>
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
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              disabled={errors.passwordErr}
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
