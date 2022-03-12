import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logodark from "../../static/navbar/logo-dark.png";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./login.css";
import { login } from "../../Store/Actions/auth";

const Login = ({ login }) => {
  const history=useHistory();  //hook for props.history
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login (email, password)
    history.push("/home/")
  };
  // Is the user authenticated
  // Redicrect them to the home page
  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
      <p>Signin with your account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   // is authenticated?
// });
export default connect(null , { login })(Login);

// export default function Login() {
//   const history = useHistory();
//   const [users, setUsers] = useState([]);
//   const [login, setLogin] = useState({
//     loginEmail: null,
//     loginPassword: null,
//     loginError: null,
//   });
//   const [error, setError] = useState({
//     emailError: null,
//     passwordError: null,
//   });

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/base/users/")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const changeData = (e) => {
//     if (e.target.name === "email") {
//       setError({
//         ...error,
//         emailError:
//           e.target.value.length === 0 ? "This field is required" : null,
//       });
//       setLogin({
//         ...login,
//         loginEmail: e.target.value,
//       });
//     } else if (e.target.name === "password") {
//       setError({
//         ...error,
//         passwordError:
//           e.target.value.length === 0 ? "This field is required" : null,
//       });
//       setLogin({
//         ...login,
//         loginPassword: e.target.value,
//       });
//     }
//   };
//   const submitForm = (e) => {
//     e.preventDefault();
//     users.map((item) => {
//       if (
//         login.loginEmail === item.email &&
//         login.loginPassword === item.password &&
//         !error.emailError &&
//         !error.passwordError
//       ) {
//         console.log("Logged in");
//         console.log(login);
//         return history.push("/test");
//       } else {
//         return setError({
//           ...error,
//           loginError: "Email or password is incorrect",
//         });
//       }
//     });
//   };
//   document.body.style.backgroundColor = "#151A1E" ;
//   return (
//     <>
//       <div className="bodylogin">
//         {/* NAVBAR SECTION */}
//         <nav className="navbar navbar-light bg-light">
//           <div className="ms-3">
//             <Link className="navbar-brand" to="/test">
//               <img src={logodark} alt="GRABIRLOGO" />
//             </Link>
//           </div>
//         </nav>
//         {/*END NAVBAR SECTION */}
//         <div className="container text-light mainPage">
//           <div className="row">
//             {/* LEFT */}
//             <div className="col-lg-6 col-sm-12">
//               <h3 className="mb-5 mt-5 headTitle">LOGIN</h3>
//               {/* START OF FORM  */}
//               <form onSubmit={(e) => submitForm(e)} className="col-6">
//                 <div className="mb-3 mr-5">
//                   <label htmlFor="exampleInputEmail1" className="form-label">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className={`form-control ${
//                       error.emailError ? "border-danger" : ""
//                     }`}
//                     id="EmailID"
//                     aria-describedby="emailHelp"
//                     value={users.email}
//                     onChange={(e) => changeData(e)}
//                     name="email"
//                   />
//                   <div id="emailHelp" className="form-text text-danger">
//                     {error.emailError}
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="exampleInputPassword1" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className={`form-control ${
//                       error.passwordError ? "border-danger" : ""
//                     }`}
//                     id="PasswordID"
//                     name="password"
//                     value={users.password}
//                     onChange={(e) => changeData(e)}
//                   />
//                   <div id="passwordHelp" className="form-text text-danger">
//                     {error.passwordError}
//                   </div>
//                 </div>
//                 <div className="mb-3 form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="exampleCheck1"
//                   />
//                   <label className="form-check-label" htmlFor="exampleCheck1">
//                     Remember Me
//                   </label>
//                 </div>
//                 <div className="text-danger">{error.loginError}</div>
//                 <button
//                   disabled={error.emailError || error.passwordError}
//                   type="submit"
//                   className="btn btn-lg submitbtn"
//                 >
//                   Login
//                 </button>
//                 <p className="mt-2 ms-4">forgot your password?</p>
//               </form>
//             </div>
//             {/* RIGHT */}
//             <div className="col-lg-6 col-sm-12">
//               <h3 className="mb-5 mt-5 ms-5 headTitle">REGISTER</h3>
//               <h2 className="col-lg-8 col-sm-10 mb-5 describtion">
//                 We deliver on time without any taxes
//               </h2>
//               <div className="row">
//                 <div className="col-lg-6 col-sm-12 ms-5  text-center">
//                   <button className="btn btn-lg registerbtn">
//                     Create Account
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
