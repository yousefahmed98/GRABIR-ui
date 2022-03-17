import axios from "axios";
import jwt from 'jwt-decode'
import Login from "../../pages/login/Login";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "./types";

export const load_user = () =>  (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const tokenaa = localStorage.getItem('access')
    const userid = jwt(tokenaa).user_id
    console.log(userid,"////////////");
    console.log(tokenaa,"sssssssssss");
    return axios
      .get(`http://127.0.0.1:8000/base/users/${userid}/`, config)
      .then((res) => {
        const test = localStorage.getItem('current_user')
        console.log(test,"777777777777777777777777777777777777777")
        localStorage.setItem("is_staff", res.data.is_staff);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("region", res.data.region);
        localStorage.setItem("firstname", res.data.first_name);
        localStorage.setItem("lastname", res.data.last_name);
        localStorage.setItem("dateJoined", res.data.date_joined);
        localStorage.setItem("isVerfied", res.data.is_verified);
        localStorage.setItem("passportImg", res.data.passport_img);
        localStorage.setItem("groups", res.data.groups);
        localStorage.setItem("userPermissions", res.data.user_permissions);
        localStorage.setItem("superUser", res.data.is_superuser);
        localStorage.setItem("lastLogin", res.data.last_login);
        localStorage.setItem("ProfilePic", res.data.ProfilePic);
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: USER_LOADED_FAIL,
        })
      );
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

//         try {
//             const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
//             dispatch({
//                 type: USER_LOADED_SUCCESS,
//                 payload: res.data
//             });
//         } catch (err){
//             dispatch({
//                 type: USER_LOADED_FAIL,
//             });
//         }
//     } else {
//         dispatch({
//             type: USER_LOADED_FAIL,
//         });
//     }
// }

export const login = (email, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  // const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

  return axios
    .post("http://127.0.0.1:8000/base/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.tokens,
      });
      localStorage.setItem("loginErr", "success")
      dispatch(load_user());
    })
    
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      })
      localStorage.setItem("loginErr",err.response.data.detail)
      return (
        <div>
          <Login>
          <h1>test test</h1>
          </Login>
          
        </div>
      )
    }
            
    );
};

// import jwt from 'jwt-decode' // import dependency
// ...
// // some logic
// axios.post(`${axios.defaults.baseURL}/auth`, { email, password })
//     .then(res => {
//       const token = res.data.token;
//       const user = jwt(token); // decode your token here
//       localStorage.setItem('token', token);
//       dispatch(actions.authSuccess(token, user));
//     })
//     .catch(err => {
//       dispatch(actions.loginUserFail());
//   });