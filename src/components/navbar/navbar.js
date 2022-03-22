import React from "react";
import { useState, useEffect } from "react";
import logo from "../../pages/landing/assets/img/logo2.svg";
// import "./navbar.css";
import {
  CNavbar,
  CContainer,
  CNavbarToggler,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasBody,
  CNavbarNav,
  CNavLink,
  CNavItem,
  CCloseButton,
  CNavbarBrand,
} from "@coreui/bootstrap-react";
import Notify from "./notify";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../Store/Actions/getNotifications";
import { axiosInstance } from "../../network/axiosInstance";
import "../../pages/landing/css/styles.css";
import "./navbar.css";
import { className } from "postcss-selector-parser";
// new navbar component
export default function Navbar() {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("is_staff");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("region");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("dateJoined");
    localStorage.removeItem("isVerfied");
    localStorage.removeItem("passportImg");
    localStorage.removeItem("groups");
    localStorage.removeItem("userPermissions");
    localStorage.removeItem("superUser");
    localStorage.removeItem("lastLogin");
    localStorage.removeItem("loginErr");
    history.push("/login");
  };
  ///////////////////////////////////////////////////
  const [visible, setVisible] = useState(false);
  const [portal, setPortal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [mynotifications, setMyNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const AllNotifications = useSelector(
    (state) => state.NOTIFICATIONS.notificationsList
  ); //state
  const socket = useSelector((state) => state.SOCKET.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    //get all notifications here
    dispatch(getNotifications());
  }, []);

  useEffect(() => {
    //get all notifications of current user
    if (AllNotifications.length > 0 && mynotifications.length == 0) {
      getCurrentUserNotifications();
    }
  }, [AllNotifications]);

  useEffect(() => {
    //get notification from socket
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
      setMyNotifications((prev) => [
        ...prev,
        {
          body: data.type,
          from_user_name: data.senderName,
          to_user: data.reciverId,
        },
      ]);
    });
  }, [socket]);

  const getCurrentUserNotifications = () => {
    for (let n of AllNotifications) {
      if (n.to_user == localStorage.getItem("id")) {
        setMyNotifications((prev) => [...prev, n]);
      }
    }
  };
  const displayNotification = (nObj) => {
    return (
      <div key={nObj.id} className="row border mb-3">
        <span className="col-lg-3 col-md-3 rounded-5 p-2">
          <img
            src={nObj.from_user_ProfilePic}
            className="me-2 userImage"
            height="60"
            alt="ProfilePic"
            loading="lazy"
          />
        </span>
        <span className="col-lg-8 col-md-8 notification border-bottom-dark pt-4">{`${nObj.from_user_name} ${nObj.body}`}</span>
      </div>
    );
  };
  const handelRead = () => {
    setMyNotifications([]);
    setOpenNotifications(false);
    // delete from db
    for (let notify of mynotifications) {
      axiosInstance
        .delete(`/notification/notifications/${notify.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then(console.log("deleted successfully"))
        .catch((err) => console.log(err));
    }
  };
  const search = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} style={{ width: "10vw", height: "5vh" }} alt="..." />
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
              <a
                className={
                  search.pathname == "/home"
                    ? "nav-link btn btn-warning active"
                    : "nav-link"
                }
                href="/home"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  search.pathname == "/offers"
                    ? "nav-link btn btn-warning active"
                    : "nav-link"
                }
                href="/offers"
                onclick={""}
              >
                Offers
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  search.pathname == "/deals"
                    ? "nav-link btn btn-warning active"
                    : "nav-link"
                }
                href="/deals"
                onclick={""}
              >
                Deals
              </a>
            </li>

            {localStorage.getItem("id") ? (
              <>
                <li className="nav-item">
                  <a
                    className={
                      search.pathname == "/myprofile"
                        ? "nav-link btn btn-warning active"
                        : "nav-link"
                    }
                    href="/myprofile"
                  >
                    {" "}
                    {localStorage.getItem("username")}
                  </a>
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={() => setOpenNotifications(!openNotifications)}>
                    {visible ? null : (
                      <Notify
                        width={"30px"}
                        count={openNotifications ? 0 : mynotifications.length}
                      />
                    )}
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => logout()}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>{null}</>
            )}
          </ul>
        </div>
      </div>
      {openNotifications && (
        <div className="notifications border border-dark rounded  p-3">
          {mynotifications.map((n) => displayNotification(n))}
          <button
            type="button"
            className=" btn  btn-sm darkcustombtnActive mt-3"
            onClick={handelRead}
          >
            Mark as read
          </button>
        </div>
      )}
    </nav>
  );
}
