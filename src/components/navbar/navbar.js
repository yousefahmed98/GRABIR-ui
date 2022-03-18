import { useState, useEffect } from "react";
import logodark from "../../static/navbar/logo-dark.png";
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
export default function Navbar({ socket }) {
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
  const [notifications, setNotifications] = useState([])
  const [mynotifications, setMyNotifications] = useState([])
  const [openNotifications, setOpenNotifications] = useState(false)
  const AllNotifications = useSelector((state) => state.NOTIFICATIONS.notificationsList) //state
  const dispatch = useDispatch();
  
  useEffect(() => {
    //get all notifications here
    dispatch(getNotifications())
  }, [])

  useEffect(() => {
    //get all notifications of current user
    if (AllNotifications.length > 0) {
      getCurrentUserNotifications()
    }

  }, [AllNotifications])

  useEffect(() => {
    //get notification from socket
    socket?.on("getNotification", (data) => {
      console.log("data", data)
      setNotifications((prev) => [...prev, data])
      console.log(data.type, data.senderName, data.reciverId)
      setMyNotifications((prev) => [...prev, {
        body: data.type,
        from_user_name: data.senderName,
        to_user: data.reciverId,
      }])


    })
  
  }, [socket])

  

  console.log(notifications, "gaya mn socket")
  console.log(mynotifications, "after set")

  const getCurrentUserNotifications = () => {
    console.log("AllNotifications: ", AllNotifications)
    console.log("current user ", localStorage.getItem("id"))
    for (let n of AllNotifications) {
      if (n.to_user == localStorage.getItem("id")) {
        setMyNotifications((prev) => [...prev, n])
        // console.log(n)
        // let flag = false
        // // //senderName reseverid body
        // if (mynotifications.length > 0) {
        //   console.log("akter mn wahda")
        //   for (let obj of AllNotifications) {
        //     console.log("obj.id",obj.id)
        //     if (obj.id == n.id) {
        //       console.log(n.id)
        //       flag = true
        //     }
        //   }
        //   if (!flag) setMyNotifications((prev) => [...prev, n])
        // }
        // else {
        //   setMyNotifications([n])
        // }

      }
    }
    console.log(mynotifications)

  }
  const displayNotification = (nObj) => {
    console.log(nObj.from_user_ProfilePic)
    return (
      
      <div className="row">
      <span className="col-lg-4 col-md-4 rounded-5">
        <img src={nObj.from_user_ProfilePic} className="img-fluid  rounded-5 me-2 "
            alt="post image" width='60%' length='130px' />
      </span>
      <span className="col-lg-8 col-md-8 notification border-bottom-dark pt-4">{`${nObj.from_user_name} ${nObj.body}`}</span>
      {/* <button type="button" className=" btn  btn-sm darkcustombtnActive" onClick={handelRead(nObj)}>Mark as read</button> */}
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
  console.log(mynotifications, "after set")
  return (
    <div className="navParent">
      <CNavbar colorScheme="light" className="bg-light fixed-top cnavbar" expand="lg">
        <CContainer fluid>
          <CNavbarToggler
            aria-controls="offcanvasNavbar2"
            aria-label="Toggle navigation"
            onClick={() => setVisible(!visible)}
          />
          <COffcanvas className="COffcanvas" id="offcanvasNavbar2" placement="end" portal={false} visible={visible} onHide={() => setVisible(false)}>
            <COffcanvasHeader>
              <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
            </COffcanvasHeader>
            <COffcanvasBody>
              <CNavbarNav>
                <CNavbarBrand href="#">
                  <img src={logodark} alt="GRABIRLOGO" width={43} height={44} />
                </CNavbarBrand>
                <CNavItem>
                  <CNavLink href="#" active>
                    <Link to="/home" className="nav-link"> Home</Link>

                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">
                    <Link to="/deals" className="nav-link"> Deals</Link>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">
                    <Link to="/offers" className="nav-link"> Offers</Link>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">
                    <Link to="/profile" className="nav-link"> My Profile</Link>
                  </CNavLink>
                </CNavItem>
                {/* <CNavItem>
                <CNavLink href="#">Favourites</CNavLink>
              </CNavItem> */}
                {localStorage.getItem("id") ? (
                  <>
                    <CNavItem>
                      <CNavLink onClick={() => logout()} href="#">
                        <Link to="/login" className="nav-link"> Logout</Link>

                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink href="#">
                        <Link to="/profile" className="nav-link">    {localStorage.getItem("username")}</Link>

                      </CNavLink>
                    </CNavItem>
                  </>
                ) : (
                  <>
                    <CNavItem>
                      <CNavLink href="/login">Login</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink href="/register">Register</CNavLink>
                    </CNavItem>
                  </>
                )}
                {/* ////////////////////////////////////////////// */}

                <CNavItem className="notify-icon"  >
                  <div onClick={() => setOpenNotifications(!openNotifications)}>
                    {visible ? null : <Notify width={"30px"} count={openNotifications ? 0 : mynotifications.length} />}
                  </div>
                </CNavItem>

              </CNavbarNav>
              <CForm className="d-flex  nav-right">
                <CFormInput type="search" className="me-2" placeholder="Search" />
                <CButton type="submit" variant="outline" color="light" className="me-2">
                  Search
                </CButton>
              </CForm>
            </COffcanvasBody>
          </COffcanvas>
        </CContainer>
      </CNavbar>
      {openNotifications &&
        <div className="notifications border border-dark rounded  p-3">
          {mynotifications.map((n) => displayNotification(n))}
          <button type="button" className=" btn  btn-sm darkcustombtnActive" onClick={handelRead}>Mark as read</button>
        </div>
      }

    </div>
  )
}
