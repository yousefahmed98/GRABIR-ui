import React, { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import axios from "axios";

export default function Formm() {
  const [validated, setValidated] = useState(false);
  const [userForm, setUserForm] = useState({
    first_name: localStorage.getItem("firstname"),
    last_name: localStorage.getItem("lastname"),
    username: localStorage.getItem("username"),
    region: localStorage.getItem("region"),
  });
  const [errors, setErrors] = useState({
    firstnameErr: null,
    lastnameErr: null,
    usernameErr: null,
    regionErr: null,
    all_registerErr: null,
  });
  const validateName = (userOption) => {
    let checker = /^[a-z ,.'-]+$/i;
    return checker.test(userOption);
  };
  const hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
  };

  //***********************************VALIDATIONS************************************************ */
  // const validateEmail = (userOption) => {
  //   let checker = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  //   return checker.test(userOption);
  // };
  // const validatePassword = (userOption) => {
  //   let checker =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   return checker.test(userOption);
  // };
  // const hasWhiteSpace = (s) => {
  //   return s.indexOf(" ") >= 0;
  // };
  //************************************VALIDATIONS********************************************* */
  const changeData = (e) => {
    if (e.target.name === "firstname") {
      const isFirstName = validateName(e.target.value);
      const has_WhiteSpace = hasWhiteSpace(e.target.value);

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
            ? "FirstName must be more than 2 letters"
            : !isFirstName
            ? "Invalid name Format"
            : has_WhiteSpace
            ? "You should not include spaces"
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
      const isUsername = validateName(e.target.value);
      const has_WhiteSpace = hasWhiteSpace(e.target.value);

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
  const handleSubmit = (e) => {
    // const form = e.currentTarget;

    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    e.preventDefault();
    if (
      !errors.firstnameErr &&
      !errors.lastnameErr &&
      !errors.usernameErr &&
      !errors.regionErr
    ) {
      setValidated(true);
      axios
        .patch(
          `http://127.0.0.1:8000/base/users/${localStorage.getItem("id")}/`,
          userForm
        )
        .then((res) => {
          localStorage.setItem("firstname", userForm.first_name);
          localStorage.setItem("lastname", userForm.last_name);
          localStorage.setItem("username", userForm.username);
          localStorage.setItem("region", userForm.region);
          setErrors({
            ...errors,
            all_registerErr: null,
          });
          window.alert("Your Data Updated Successfully!")
        })
        .catch((err) => {
          console.log(err);
          console.log("errrorrrr", err.response.data.username[0]);
          setErrors({
            ...errors,
            all_registerErr: err.response.data.username[0],
          });
          
          // all_registerErr
        });
    } else {
      return setErrors({
        ...errors,
        all_registerErr: "something went error!",
      });
    }
  };

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => handleSubmit(e)}
        className="form-info"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={userForm.first_name}
              onChange={(e) => changeData(e)}
              name="firstname"
            />
            <div id="usernameHelp" className="form-text text-danger">
              {errors.firstnameErr}
            </div>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={userForm.last_name}
              onChange={(e) => changeData(e)}
              name="lastname"
            />
            <div id="lastnameHelp" className="form-text text-danger">
              {errors.lastnameErr}
            </div>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                value={userForm.username}
                onChange={(e) => changeData(e)}
                name="username"
              />
              <div id="lastnameHelp" className="form-text text-danger">
                {errors.usernameErr}
              </div>

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Region </Form.Label>
            <Form.Control
              type="text"
              placeholder="Region"
              value={userForm.region}
              onChange={(e) => changeData(e)}
              name="region"
              required
            />
            <div id="lastnameHelp" className="form-text text-danger">
              {errors.regionErr}
            </div>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group> */}
        <Button
          type="submit"
          className="btn-add"
          disabled={
            errors.firstnameErr ||
            errors.lastnameErr ||
            errors.regionErr ||
            errors.usernameErr
          }
        >
          Save
        </Button>
        <div className="text-danger">{errors.all_registerErr}</div>
      </Form>
    </div>
  );
}
