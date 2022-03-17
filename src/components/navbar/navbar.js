import React from "react"

import { useState } from "react";
import logodark from "../../static/navbar/logo-dark.png";
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
import Search from "../search/search";
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
    <CNavbar
      colorScheme="light"
      className="bg-light fixed-top cnavbar"
      expand="lg"
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
              <CNavbarBrand href="#">
                <img src={logodark} alt="GRABIRLOGO" width={43} height={44} />
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
              <CNavItem>
                <CNavLink href="/profile">
                  <p className="nav-link"> My Profile</p>
                </CNavLink>
              </CNavItem>
              {/* <CNavItem>
                <CNavLink href="#">Favourites</CNavLink>
              </CNavItem> */}
              {localStorage.getItem("id") ? (
                <>
                  <CNavItem>
                    <CNavLink onClick={() => logout()} href="/login">
                      <p  className="nav-link"> Logout</p>

                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="/profile">
                      <p className="nav-link">{localStorage.getItem("username")}</p>

                    </CNavLink>
                  </CNavItem>
                </>
              ) : (
                <>
                  <CNavItem>
                    <CNavLink href="/login"><p className="nav-link"> Login</p></CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="/register"><p className="nav-link">Register</p></CNavLink>
                  </CNavItem>
                </>
              )}
              <CNavItem className="notify-icon">
                {visible ? null : <Noty width={"30px"} count={4} />}
                {/* <img className="bell" src={bell} alt="bell" width={22} height={24}/> */}
              </CNavItem>
            </CNavbarNav>
            <CForm className="d-flex  nav-right">
              {/* <CFormInput type="search" className="me-2" placeholder="Search" /> */}
              <Search />

              <CButton
                type="submit"
                variant="outline"
                color="light"
                className="me-2"
              >
                Search
              </CButton>
            </CForm>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
}
