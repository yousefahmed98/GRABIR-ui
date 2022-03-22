import React from "react";
import "../landing/css/styles.css";
import logo from "./assets/img/logo2.svg";
import portfolio1 from "./assets/img/portfolio/1.jpg";
import portfolio2 from "./assets/img/portfolio/2.jpg";
import portfolio3 from "../../static/ps5.jpg";
import portfolio4 from "./assets/img/portfolio/4.jpg";
import portfolio5 from "./assets/img/portfolio/5.jpg";
import portfolio6 from "./assets/img/portfolio/6.jpg";
import about1 from "./assets/img/about/1.jpg";
import about2 from "./assets/img/about/2.jpg";
import about3 from "./assets/img/about/3.jpg";
import microsoft from "./assets/img/logos/microsoft.svg";
import google from "./assets/img/logos/google.svg";
import ibm from "./assets/img/logos/ibm.svg";
import facebook from "./assets/img/logos/facebook.svg";
import closeIcon from "./assets/img/close-icon.svg";
import "./js/scripts";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { data } from "uikit";
export default function Landing() {
  const [userForm, setUserForm] = useState({
    subject: "",
    email: "",
    body: "",
  });
  const [done, setDone] = useState({
    msg: null,
  });
  const [errors, setErrors] = useState({
    subjectErr: null,
    emailErr: null,
    bodyErr: null,
  });

  const validateEmail = (userOption) => {
    let checker = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return checker.test(userOption);
  };

  const validateName = (userOption) => {
    let checker = /^[a-z ,.'-]+$/i;
    return checker.test(userOption);
  };
  const changeData = (e) => {
    if (e.target.name === "subject") {
      const isName = validateName(e.target.value);
      setUserForm({
        ...userForm,
        subject: e.target.value,
      });
      setErrors({
        ...errors,
        subjectErr:
          e.target.value.length === 0
            ? "A subject is required."
            : !isName
            ? "Invalid subject Format"
            : e.target.value.length < 5
            ? "Subject should be at least 5 charters"
            : null,
      });
    } else if (e.target.name === "email") {
      const isEmail = validateEmail(e.target.value);
      setUserForm({
        ...userForm,
        email: e.target.value,
      });
      setErrors({
        ...errors,
        emailErr:
          e.target.value.length === 0
            ? "Email is required."
            : !isEmail
            ? "Invalid Email Format"
            : null,
      });
    } else if (e.target.name === "body") {
      setUserForm({
        ...userForm,
        body: e.target.value,
      });
      setErrors({
        ...errors,
        bodyErr:
          e.target.value.length === 0
            ? "Message is required."
            : e.target.value.length < 20
            ? "Your message must be at least 20 Character"
            : null,
      });
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (!errors.emailErr && !errors.subjectErr && !errors.bodyErr) {
      var bodyFormData = new FormData()
      bodyFormData.append('subject', userForm.subject)
      bodyFormData.append('email', userForm.email)
      bodyFormData.append('body', userForm.body)
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/base/email-receiver/",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log(response);
          return setDone({...done, msg: "Your Message Has been Successfully Sent"})
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  return (
    <div id="page-top">
      {/* <!-- Navigation--> */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="#page-top">
            <img src={logo} style={{ width: "8vw", height: "5vh" }} alt="..." />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars ms-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- Masthead--> */}
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading">Welcome To GRABIR</div>
          <div className="masthead-heading text-uppercase">
            It's Nice To Meet You
          </div>
          {localStorage.getItem("id") ? (
            <div className="masthead-subheading">
              Hello, {localStorage.getItem("username")}
            </div>
          ) : (
            <div className="masthead-subheading">Join Us Now!</div>
          )}

          <br />
          {localStorage.getItem("id") ? (
            <>
              <Link
                className="btn btn-primary btn-xl text-uppercase"
                style={{ marginRight: 20 }}
                to="/home"
              >
                Home
              </Link>
            </>
          ) : (
            <>
              <a
                className="btn btn-primary btn-xl text-uppercase"
                style={{ marginRight: 20 }}
                href="/login"
              >
                Login
              </a>

              <a
                className="btn btn-primary btn-xl text-uppercase"
                href="/register"
              >
                Register
              </a>
            </>
          )}
        </div>
      </header>
      {/* <!-- Services--> */}
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
            <h3 className="section-subheading text-muted">
              Get what you need from your home
            </h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">E-Commerce</h4>
              <p className="text-muted">
                Here You can get any product is looks like e-commerce
                application with low cost and also you can make money from get
                orders to clients.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Responsive Design</h4>
              <p className="text-muted">
                This application is made for laptops, tablets, bigScreens and
                mobiles
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Web Security</h4>
              <p className="text-muted">
                Feel Safe with us, your data is fully protected and not shared
                with any one and payment is fully encrypted and all travellars
                are truseted with passportid
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Portfolio Grid--> */}
      <section className="page-section bg-light" id="portfolio">
        <div className="container">
          <div className="text-center">
            {/* <h2 className="section-heading text-uppercase"></h2> */}
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-4">
              {/* <!-- Portfolio item 1--> */}
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal1"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={portfolio1} alt="..." />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Smart Watch</div>
                  <div className="portfolio-caption-subheading text-muted"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              {/* <!-- Portfolio item 2--> */}
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal2"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={portfolio2} alt="..." />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Sports</div>
                  <div className="portfolio-caption-subheading text-muted"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              {/* <!-- Portfolio item 3--> */}
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal3"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={portfolio3} alt="..." />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">PlayStation</div>
                  <div className="portfolio-caption-subheading text-muted"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
              {/* <!-- Portfolio item 4--> */}
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal4"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={portfolio4} alt="..." />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Drink</div>
                  <div className="portfolio-caption-subheading text-muted"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4 mb-sm-0">
              {/* <!-- Portfolio item 5--> */}
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal5"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={portfolio5} alt="..." />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Laptop</div>
                  <div className="portfolio-caption-subheading text-muted"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              {/* <!-- Portfolio item 6--> */}
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href="#portfolioModal6"
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={portfolio6} alt="..." />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">Perfume</div>
                  <div className="portfolio-caption-subheading text-muted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About--> */}
      <section className="page-section" id="about">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">About</h2>
            {/* <h3 className="section-subheading text-muted"></h3> */}
          </div>
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={about1}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>2022</h4>
                  <h4 className="subheading">Our Humble Beginnings</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    All of us always want to buy a something from abroad because
                    of variety of products and the low cost but if you buy
                    something from outside your country it will cost you alot
                    due to taxes and shipping payments and this process may take
                    alot of time and if you don’t have someone travilling
                    outside and coming soon.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={about2}
                  alt="..."
                />
              </div>
            </li>
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={about3}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>March 2022</h4>
                  <h4 className="subheading">Transition to Full Service</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    The application is covering a variety of features that are
                    always found on different applications, instead of a fully
                    integrated one.
                  </p>
                </div>
              </div>
            </li>

            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>
                  Be Part
                  <br />
                  Of Our
                  <br />
                  Story!
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* <!-- Clients--> */}
      <div className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 col-sm-6 my-3">
              <a href="https://www.microsoft.com/en-eg">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={microsoft}
                  alt="..."
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="https://www.google.com">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={google}
                  alt="..."
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="https://www.facebook.com">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={facebook}
                  alt="..."
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="https://www.ibm.com">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={ibm}
                  alt="..."
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact--> */}
      <section className="page-section" id="contact">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Contact Us</h2>
            <h3 className="section-subheading text-muted">
              You can always tell us what you thinking about
            </h3>
          </div>
          <form
            id="contactForm"
            data-sb-form-api-token="API_TOKEN"
            onSubmit={(e) => submitForm(e)}
          >
            <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                <div className="form-group">
                  {/* <!-- Name input--> */}
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Email Subject *"
                    data-sb-validations="required"
                    name="subject"
                    value={userForm.subject}
                    onChange={(e) => changeData(e)}
                  />
                  <div>
                    <p className="text-danger">{errors.subjectErr}</p>
                  </div>
                </div>
                <div className="form-group">
                  {/* <!-- Email address input--> */}
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="Your Email *"
                    data-sb-validations="required,email"
                    name="email"
                    value={userForm.email}
                    onChange={(e) => changeData(e)}
                  />
                  <div>
                    <p className="text-danger">{errors.emailErr}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-textarea mb-md-0">
                  {/* <!-- Message input--> */}
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Your Message *"
                    data-sb-validations="required"
                    name="body"
                    value={userForm.body}
                    onChange={(e) => changeData(e)}
                  ></textarea>
                  <div>
                    <p className="text-danger"> {errors.bodyErr}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="d-none" id="submitSuccessMessage">
              <div className="text-center text-white mb-3">
                <div className="fw-bolder">Form submission successful!</div>
                Thank you for your time, we will contact you soon.
                <br />
                <a href="https://startbootstrap.com/solution/contact-forms">
                  https://startbootstrap.com/solution/contact-forms
                </a>
              </div>
            </div>
            <div className="d-none" id="submitErrorMessage">
              <div className="text-center text-danger mb-3">
                Error sending message!
              </div>
            </div> */}
            {/* <!-- Submit Button--> */}
            <div className="text-center">
              <button
                className="btn btn-primary btn-xl text-uppercase "
                id="submitButton"
                type="submit"
                disabled={
                  errors.subjectErr || errors.bodyErr || errors.emailErr
                }
              >
                Send Message
              </button>
              <div>
                <p className="text-success">{done.msg}</p>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* <!-- Footer--> */}
      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start">
              Copyright &copy; GRABIR 2022
            </div>
            <div className="col-lg-4 my-3 my-lg-0">
              <a className="btn btn-dark btn-social mx-2" href="#!">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-dark btn-social mx-2" href="#!">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-dark btn-social mx-2" href="#!">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a className="link-dark text-decoration-none me-3" href="/privacy">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Portfolio Modals-->
    <!-- Portfolio item 1 modal popup--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal1"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src={closeIcon} alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    {/* <!-- Project details--> */}
                    <h2 className="text-uppercase">Smart Watch</h2>
                    <p className="item-intro text-muted"></p>
                    <img
                      className="img-fluid d-block mx-auto"
                      src={portfolio1}
                      alt="..."
                    />
                    <p>
                      A smartwatch is a wearable computer in the form of a
                      watch; modern smartwatches provide a local touchscreen
                      interface for daily use, while an associated smartphone
                      app provides for management and telemetry (such as
                      long-term biomonitoring). While early models could perform
                      basic tasks
                    </p>
                    <ul className="list-inline">
                      <li></li>
                      <li></li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-times me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Portfolio item 2 modal popup--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal2"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src={closeIcon} alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    {/* <!-- Project details--> */}
                    <h2 className="text-uppercase">Sports</h2>

                    <img
                      className="img-fluid d-block mx-auto"
                      src={portfolio2}
                      alt="..."
                    />
                    <p>
                      Sport pertains to any form of competitive physical
                      activity or game[1] that aims to use, maintain or improve
                      physical ability and skills while providing enjoyment to
                      participants and, in some cases, entertainment to
                      spectators.
                    </p>
                    <ul className="list-inline">
                      <li></li>
                      <li></li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-times me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Portfolio item 3 modal popup--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal3"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src={closeIcon} alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    {/* <!-- Project details--> */}
                    <h2 className="text-uppercase">PlayStation</h2>

                    <img
                      className="img-fluid d-block mx-auto"
                      src={portfolio3}
                      alt="..."
                    />
                    <p>
                      he PlayStation 5 (PS5) is a home video game console
                      developed by Sony Interactive Entertainment. Announced in
                      2019 as the successor to the PlayStation 4, the PS5 was
                      released on November 12, 2020, in Australia, Japan, New
                      Zealand, North America, and South Korea, with worldwide
                      release following a week later. The PS5 is part of the
                      ninth generation of video game consoles, along with
                      Microsoft's Xbox Series X and Series S consoles, which
                      were released in the same month
                    </p>
                    <ul className="list-inline">
                      <li></li>
                      <li></li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-times me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Portfolio item 4 modal popup--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal4"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src={closeIcon} alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    {/* <!-- Project details--> */}
                    <h2 className="text-uppercase">CocaCola</h2>
                    <img
                      className="img-fluid d-block mx-auto"
                      src={portfolio4}
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li></li>
                      <li></li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-times me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Portfolio item 5 modal popup--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal5"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src={closeIcon} alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    {/* <!-- Project details--> */}
                    <h2 className="text-uppercase">Laptop</h2>
                    <img
                      className="img-fluid d-block mx-auto"
                      src={portfolio5}
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li></li>
                      <li></li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-times me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Portfolio item 6 modal popup--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal6"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal">
              <img src={closeIcon} alt="Close modal" />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    {/* <!-- Project details--> */}
                    <h2 className="text-uppercase">Perfume</h2>

                    <img
                      className="img-fluid d-block mx-auto"
                      src={portfolio6}
                      alt="..."
                    />
                    <p>
                      Use this area to describe your project. Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Est blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat
                      aperiam quasi sunt officia expedita beatae cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!
                    </p>
                    <ul className="list-inline">
                      <li></li>
                      <li></li>
                    </ul>
                    <button
                      className="btn btn-primary btn-xl text-uppercase"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      <i className="fas fa-times me-1"></i>
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
