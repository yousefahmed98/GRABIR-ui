import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Navbar from '../../components/navbar/navbar';
import Btnpic from './Btnpicture';

import Edit from './Edit'
import Editadd from './Edit copy';
// import Picture from './Picture';
// import Picture from './picture';
import './profile.css'

export default function Profile() {
    const [key, setKey] = useState('home');
  
    return (
    <>
        <Navbar />
        {/* <Picture  /> */}
        <Btnpic />
        <div  className=" tabss">
      <Tabs 
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="BASIC INFORMATION" className='tab'>
            <>
            <div>
                <h4>
                  First Name :
               </h4>
                 <p> {localStorage.getItem("firstname")}</p>
                 <hr/>
                 <h4> 
                     Last Name :
                 </h4>
                 <p> {localStorage.getItem("lastname")}</p>
                 <hr/>
                 <h4>
                    User Name :
                </h4>
                 <p> {localStorage.getItem("username")} </p>
                 <hr/>
                 <h4>
                    Region :
                 </h4>
                 <p> {localStorage.getItem("region")} </p>
                 <hr/>
             </div>
           <br />
           <br />
        <Edit />
            </>
        </Tab>


        {/*  TAB 2 */}
        <Tab eventKey="profile" title=" Security Information" className='tab'>
        <>
            <div>
                 <h4>
                    ID number :
                </h4>
                 <p> {localStorage.getItem("id")}</p>
                 <hr/>
                 <h4>
                  Email :
               </h4>
                 <p> {localStorage.getItem("email")} </p> 
                 <hr/>
                 <h4> 
                    Password :
                 </h4>
                 <p> ********** </p>
                 <hr/>
                 <h4>
                    Joined :
                 </h4>
                 <p> {localStorage.getItem("dataJoined")} </p>
                 <hr/>
                 <h4>
                    Verfied :
                 </h4>
                <p> {localStorage.getItem("isVerfied") === "true" ? "Yes" : "No" } </p>
                <hr/>
             </div>
           <br />
           <br />
        <Editadd />
            </>
        </Tab>
        
      </Tabs>
      </div>
      </>
    );
  }
  
