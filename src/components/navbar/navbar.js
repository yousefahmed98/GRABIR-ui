import React from "react"

import { useState } from "react";
// import logodark from "../../static/navbar/logo-dark.png";
// import logo from "../../static/navbar/logo-default.png";
import logo from "../../pages/landing/assets/img/logo2.svg";


// import bell from "../../static/navbar/bell.png"
// import chat from "../../static/navbar/chat.png"
import "./navbar.css";
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
  CFormInput,
  CForm,
  CButton,
  CCloseButton,
  CNavbarBrand,
} from "@coreui/bootstrap-react";
import Noty from "./notify";
// new navbar component
export default function Navbar() {
  const [visible, setVisible] = useState(false);
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
          onClick={() => setVisible(!visible)}
        />
        <COffcanvas
          className="COffcanvas"
          id="offcanvasNavbar2"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <CCloseButton
              className="text-reset"
              onClick={() => setVisible(false)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav>
              <CNavbarBrand href="/">
                <img src={logo} alt="GRABIRLOGO" style={{width:"5vw", height: "5vh"}} />
              </CNavbarBrand>
              <CNavItem>
                <CNavLink href="/home" active>
                  <p className="nav-link"> Home</p>

                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/deals">
                  <p className="nav-link"> Deals</p>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/offers">
                  <p className="nav-link"> Offers</p>
                </CNavLink>
              </CNavItem>
           
              
            </CNavbarNav>
            {/* <CForm className="d-flex  nav-right">  */}
              {/* <CFormInput type="search" className="me-2" placeholder="Search" /> */}
              <CNavbarNav className="d-flex  nav-right">
              <CNavItem className="notify-icon">
                {visible ? null : <Noty width={"30px"} count={4} />}
                {/* <img className="bell" src={bell} alt="bell" width={22} height={24}/> */}
              </CNavItem>
              {localStorage.getItem("id") ? (
                <>
                 <CNavItem>
                    <CNavLink href="/myprofile">
                      <p className="nav-link">{localStorage.getItem("username")}</p>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={() => logout()} href="/login">
                      <p  className="nav-link"> Logout</p>
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
    </div>
  );
}
