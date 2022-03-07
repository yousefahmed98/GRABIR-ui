import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"

export default function Footer() {
  return (
<>
<div className=" p-4 bg-dark text-light footerbackground">
    <section className="">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase footerTitle">Site Menu</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <Link to="#" className="text-light sitemenuItems">Home</Link>
            </li>
            <li>
              <Link to="#!" className="text-light sitemenuItems">About us</Link>
            </li>
            <li>
              <Link to="#!" className="text-light sitemenuItems">Get in Touch</Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-4 col-md-6 mb-4 mb-md-0 ">
          <h5 className="text-uppercase footerTitle">Contacts</h5>
          <ul className="list-unstyled mb-0">
            <li>
              <Link to="#" className="text-light sitemenuItems">grabirSupport@grabir.com</Link>
            </li>
            <li>
              <Link to="#" className="text-light sitemenuItems">Hotline: 19019</Link>
            </li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase footerTitle">Follow us</h5>
          <ul className="list-unstyled mb-0">
            <li>
              <Link to="#" className="text-light sitemenuItems">https://www.facebook.com/grabir.app</Link>
            </li>
            <li>
            <Link to="#" className="text-light sitemenuItems">https://www.instgram.com/grabir.5422</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  
  <div className="text-center p-3 bg-dark text-light">
    © 2022 Copyright: GRABIRAPP
    <Link className="text-primary" to="https://mdbootstrap.com/"></Link>
  </div>
</>
  )
}
