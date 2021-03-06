import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../login/login2.css";
import { login } from "../../Store/Actions/auth";
import TextField from "@mui/material/TextField";
import logo from "../landing/assets/img/logo2.svg"

const Login2 = ({ login }) => {
 
  const history = useHistory(); //hook for props.history

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);

    if (localStorage.getItem("loginErr") === "success") {
      //login success no errors
      localStorage.removeItem("loginErr");
      return history.push("/home/");

    } else {
      localStorage.getItem("loginErr");
      history.push("/login/");
      // return <Redirect to='/deals'/>
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
              <div className="container-sm h-100">
                <div className="row d-flex justify-content-center align-items-center h-30 my-4 "><img src={logo} style={{ width: "50%" }} alt="..." /></div>

                <div className="row d-flex justify-content-center align-items-center h-50">

                  <div className="col-12 col-md-7 col-lg-6 col-xl-5 col-sm-10">
                    <div className="card" style={{ borderRadius: 15 }}>
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5 loginn">
                          LOGIN
                        </h2>

                        <form onSubmit={(e) => onSubmit(e)}>
                          <div className="mb-3 mr-5">
                            <TextField
                              id="EmailID"
                              className="form-control"
                              label="Email"
                              type="email"
                              // style={{ marginBottom: 5 }}
                              name="email"
                              value={email}
                              onChange={(e) => onChange(e)}
                              required
                            />

                          </div>
                          <div className="mb-3">

                            <TextField
                              id="PasswordID"
                              className="form-control"
                              label="Password"
                              type="password"
                              // style={{ marginBottom: 5 }}
                              name="password"
                              value={password}
                              onChange={(e) => onChange(e)}
                              minLength="6"
                              required
                            />

                          </div>
                          <p className="text-danger">
                            {localStorage.getItem("loginErr")}
                          </p>

                          <div className="d-flex justify-content-center mb-3">
                            <button
                              type="submit"
                              className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body loginn"
                            >
                              Login
                            </button>
                          </div>
                          <br/>
                          <p className="text-center text-muted mt-5 mb-0">
                            Forgot your password?{" "}
                            <a href="/reset" className="fw-bold text-body">
                              <u> Reset! </u>
                            </a>
                          </p>
                          <br />
                          <p className="text-center text-muted mt-5 mb-0">
                            Doesn't have an account?{" "}
                            <a href="/register" className="fw-bold text-body">
                              <u>Register now!</u>
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
};

export default connect(null, { login })(Login2);
