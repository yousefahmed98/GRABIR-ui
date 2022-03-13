import { useState, useEffect } from "react";
import logodark from "../../static/navbar/logo-dark.png";
// import { Link } from "react-router-dom";
// import bell from "../../static/navbar/bell.png"
// import chat from "../../static/navbar/chat.png"
import "./navbar.css";
import {
  CNavbar, CContainer, CNavbarToggler, COffcanvas, COffcanvasHeader, COffcanvasBody, CNavbarNav, CNavLink
  , CNavItem, CFormInput, CForm, CButton, CCloseButton, CNavbarBrand
} from '@coreui/bootstrap-react';
import Notify from './notify'


// new navbar component 
export default function Navbar({ socket }) {

  const [visible, setVisible] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data])
    })
  }, [socket])
  console.log(notifications)

  const displayNotification = ({ senderId, type }) => {
    let senderName
    return (
      <span className="notification border-bottom-dark">{`${senderId} ${type}`}</span>

    )

  }
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
                <CNavLink href="/home" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/deals">Deals</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/offers">Offers</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">My Profile</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Favourites</CNavLink>
              </CNavItem>
              <CNavItem className="notify-icon">

                {visible ? null : <Notify width={"30px"} count={4} />}
                {/* <img className="bell" src={bell} alt="bell" width={22} height={24}/> */}
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
     <div className="notifications border border-dark rounded  p-3">
     {notifications.map((n)=> displayNotification(n))}
  </div>
   </div>
  )
}
