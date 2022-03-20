import React from "react"
import { useState, useEffect } from "react";
import logo from "../../pages/landing/assets/img/logo2.svg";
import "./navbar.css";
import {
  CNavbar, CContainer, CNavbarToggler, COffcanvas, COffcanvasHeader, COffcanvasBody, CNavbarNav, CNavLink
  , CNavItem, CFormInput, CForm, CButton, CCloseButton, CNavbarBrand
} from '@coreui/bootstrap-react';
import Notify from './notify'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getNotifications } from "../../Store/Actions/getNotifications"
import { axiosInstance } from "../../network/axiosInstance"
// new navbar component 
export default function Navbar() {
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
  };
  ///////////////////////////////////////////////////
  const [visible, setVisible] = useState(false)
  const [portal, setPortal] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [mynotifications, setMyNotifications] = useState([])
  const [openNotifications, setOpenNotifications] = useState(false)
  const AllNotifications = useSelector((state) => state.NOTIFICATIONS.notificationsList) //state
  const socket = useSelector((state) => state.SOCKET.socket);
  const dispatch = useDispatch();
  
  useEffect(() => {
    //get all notifications here
    dispatch(getNotifications())
  }, [])

  useEffect(() => {
    //get all notifications of current user
    if (AllNotifications.length > 0 && mynotifications.length == 0 ) {
      getCurrentUserNotifications()
    }

  }, [AllNotifications])

  useEffect(() => {
    //get notification from socket
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data])
      setMyNotifications((prev) => [...prev, {
        body: data.type,
        from_user_name: data.senderName,
        to_user: data.reciverId,
      }])


    })
  
  }, [socket])


  const getCurrentUserNotifications = () => {
    for (let n of AllNotifications) {
      if (n.to_user == localStorage.getItem("id")) {
        setMyNotifications((prev) => [...prev, n])
      }
    }

  }
  const displayNotification = (nObj) => {
    return (
      
      <div className="row border mb-3">
      <span className="col-lg-3 col-md-3 rounded-5 p-2">
       <img src={nObj.from_user_ProfilePic} className="me-2 userImage"height="60" alt="ProfilePic" loading="lazy" />
      </span>
      <span className="col-lg-8 col-md-8 notification border-bottom-dark pt-4">{`${nObj.from_user_name} ${nObj.body}`}</span>
      </div>
    )

  }
  const handelRead = () => {
    setMyNotifications([])
    setOpenNotifications(false)
    // delete from db
    for (let notify of mynotifications){
    axiosInstance.delete(`/notification/notifications/${notify.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      }
    })
      .then(console.log("deleted successfully"))
      .catch((err) => console.log(err))

  }
  }
  return (
    <div className="navbaring">
    <CNavbar    
      className="fixed-top"
      expand="lg"
      style={{backgroundColor:"#212529", color: "#ffff"}}
    >
      <CContainer fluid>
        <CNavbarToggler
          aria-controls="offcanvasNavbar2"
          aria-label="Toggle navigation"
          onClick={() =>{ setVisible(!visible)}}
        />
        <COffcanvas
          className="COffcanvas"
          id="offcanvasNavbar2"
          placement="end"
          portal={visible}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <CCloseButton
              className="text-reset"
              onClick={() => setPortal(true)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav className="pb-5">
              <CNavbarBrand href="#">
              <Link to= "/" className=" nav-link"> <img src={logo} alt="GRABIRLOGO" style={{width:"5vw", height: "5vh"}} /></Link>
               
              </CNavbarBrand>
              <CNavItem className="">
                <CNavLink href="#" active className="">
                  <Link to= "/home" className=" nav-link">  <p className="nav-link"> Home</p></Link>
                </CNavLink>
              </CNavItem>
              <CNavItem className="">
                <CNavLink href="#">
                <Link to= "/deals" className=" nav-link">  <p className="nav-link"> Deals</p></Link>
                </CNavLink>
              </CNavItem>
              <CNavItem className="">
                <CNavLink href="#">
                <Link to= "/offers" className=" nav-link">  <p className="nav-link"> Offers</p></Link>
                </CNavLink>
              </CNavItem>
           
              
            </CNavbarNav>
              <CNavbarNav className="d-flex  nav-right">
              <CNavItem className="notify-icon "  >
                  <div onClick={() => setOpenNotifications(!openNotifications)}>
                    {visible ? null : <Notify width={"30px"} count={openNotifications ? 0 : mynotifications.length} />}
                  </div>
                </CNavItem>
              {localStorage.getItem("id") ? (
                <>
                 <CNavItem className="">
                    <CNavLink href="#">
                    <Link to= "/myprofile" className=" nav-link"> <p className="nav-link">{localStorage.getItem("username")}</p></Link>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={() => logout()} href="#" >
                    <Link to= "/login" className=" nav-link"> <p className="nav-link">Logout</p></Link>
                    </CNavLink>
                  </CNavItem>
                </>
              ) : (
                <>
                  {null}
                
                </>
              )}
            
              </CNavbarNav>
              {/* <CButton
                type="submit"
                variant="outline"
                color="light"
                className="me-2"
              >
                Search
              </CButton> */}
             {/* </CForm> */}
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
     {openNotifications &&
        <div className="notifications border border-dark rounded  p-3">
          {mynotifications.map((n) => displayNotification(n))}
          <button type="button" className=" btn  btn-sm darkcustombtnActive mt-3" onClick={handelRead}>Mark as read</button>
        </div>
      }
    </div>
  );

}
