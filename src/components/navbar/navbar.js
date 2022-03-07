import {useState} from "react";
import logodark from "../../static/navbar/logo-dark.png";
// import { Link } from "react-router-dom";
// import bell from "../../static/navbar/bell.png"
// import chat from "../../static/navbar/chat.png"
import "./navbar.css";
import { CNavbar ,CContainer,CNavbarToggler ,COffcanvas,COffcanvasHeader,COffcanvasTitle,COffcanvasBody,CNavbarNav,CNavLink
, CNavItem,CDropdownToggle,CDropdown,CDropdownItem,CFormInput,CForm,CButton,CCloseButton,CDropdownMenu,CDropdownDivider,CNavbarBrand}from '@coreui/bootstrap-react';
import Noty from './notify'


// new navbar component 
export default function Navbar() {

  const [visible, setVisible] = useState(false)

return (
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
           <img src={logodark} alt="GRABIRLOGO" width={43} height={44}/>
          </CNavbarBrand>
        
            <CNavItem>
              <CNavLink href="/home" active>
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Deals</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Offers</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">My Profile</CNavLink>
            </CNavItem> 
            <CNavItem>
              <CNavLink href="#">Favourites</CNavLink>
            </CNavItem> 
            <CNavItem className="notify-icon">

            {visible?null:<Noty width={"30px"}  count={4} /> }
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
)
}

//old nav
// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container-fluid">
//         <Link className="navbar-brand" href="#">
//           <img src={logodark} className="logo" alt="" />
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link active" to="/">
//                 GRABIR
//               </Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav navbar-nav-right d-flex">
//             <li>
//               <Link className="homelink nav-link active" aria-current="page" href="#">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link className="nav-link active" aria-current="page" href="#">
//               <img className="chat" src={chat} alt="chat"/>
//               </Link>
//             </li>
//             <li>
//               <Link className="nav-link active" aria-current="page" href="#">
//                 <img className="bell" src={bell} alt="bell"/>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
// )
// }



