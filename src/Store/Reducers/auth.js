// import jwtDecode from "jwt-decode";
import jwt from "jwt-decode";
// import { useSelector } from "react-redux";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "../Actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  is_staff: localStorage.getItem("is_staff"),
  id: localStorage.getItem("id"),
  email: localStorage.getItem("email"),
  username: localStorage.getItem("username"),
  region: localStorage.getItem("region"),
  firstname: localStorage.getItem("firstname"),
  lastname: localStorage.getItem("lastname"),
  dateJoined: localStorage.getItem("dateJoined"),
  isVerfied: localStorage.getItem("isVerfied"),
  passportImg: localStorage.getItem("passportImg"),
  groups: localStorage.getItem("groups"),
  userPermissions: localStorage.getItem("userPermissions"),
  superUser: localStorage.getItem("superUser"),
  lastLogin: localStorage.getItem("lastLogin"),
  isAuthenticated: null,
  user: null,
  loginErr:localStorage.getItem("loginErr"),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      const USER = jwt(payload.access); // decode your token here
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        user: payload.email,
        id: payload.id,
        region: payload.region,
        isVerfied: payload.isVerfied,
      };

    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
}
