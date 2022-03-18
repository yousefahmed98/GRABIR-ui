import { Reviews } from '@mui/icons-material';
import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Navbar from '../../components/navbar/navbar';
import Btnpic from './Btnpicture';

import Edit from './Edit'
import Editadd from './Edit copy';
// import Picture from './Picture';
// import Picture from './picture';
import './profile.css'
import StarRating from "../../components/StarRating/StarRating"
export default function Profile() {
    const [key, setKey] = useState('home');
  
    return (
    <div class="profile">
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
                  Firstname : 
               </h4>
                 <p className='text-capitalize'> {localStorage.getItem("firstname")}</p>
                 <hr/>
                 <h4> 
                     Lastname :
                 </h4>
                 <p className='text-capitalize'> {localStorage.getItem("lastname")}</p>
                 <hr/>
                 <h4>
                    Username :
                </h4>
                 <p className='text-capitalize'> {localStorage.getItem("username")} </p>
                 <hr/>
                 <h4>
                    Region :
                 </h4>
                 <p className='text-capitalize'> {localStorage.getItem("region")} </p>
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
                    ID :
                </h4>
                 <p> {localStorage.getItem("id")}</p>
                 <hr/>
                 <h4>
                  Email :
               </h4>
                 <p className='text-capitalize'> {localStorage.getItem("email")} </p> 
                 <hr/>
                 <h4> 
                    Password :
                 </h4>
                 <p> ********** </p>
                 <hr/>
                 <h4>
                   Date joined :
                 </h4>
                 <p> {localStorage.getItem("dateJoined")} </p>
                 <hr/>
                 <h4>
                   Email verfied :
                 </h4>
                <p> {localStorage.getItem("isVerfied") === "true" ? "Yes" : "No" } </p>
                <hr/>
             </div>
           <br />
           <br />
        <Editadd />
            </>
        </Tab>

        <Tab eventKey="review" title="Reviews" className='tab'>
            <>
            <h3>Rates & comments : </h3>

            <StarRating/>
            </>
        </Tab>
      </Tabs>
      </div>
      </div>
    );
  }