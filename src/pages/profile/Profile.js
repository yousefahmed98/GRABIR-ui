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
                 <p> Nehal</p>
                 <hr/>
                 <h4> 
                     Last Name :
                 </h4>
                 <p> Hassan </p>
                 <hr/>
                 <h4>
                    User Name :
                </h4>
                 <p> Nehalh4</p>
                 <hr/>
                 <h4>
                    City :
                 </h4>
                 <p> Giza </p>
                 <hr/>
                 <h4>
                    State :
                 </h4>
                <p> 6oct</p>
                <hr/>
                 <h4>
                     Zip Code :
                 </h4>
                 <p> 11062</p>
             </div>
           <br />
           <br />
        <Edit />
            </>
        </Tab>


        {/*  TAB 2 */}
        <Tab eventKey="profile" title="ADDRESS" className='tab'>
        <>
            <div>
                <h4>
                  Email :
               </h4>
                 <p> Nehalhbhsd@gmail.com</p>
                 <hr/>
                 <h4> 
                    Password :
                 </h4>
                 <p>  </p>
                 <hr/>
                 <h4>
                    Address :
                </h4>
                 <p> Nehalh4</p>
                 <hr/>
                 <h4>
                    Address 1 :
                 </h4>
                 <p> Giza </p>
                 <hr/>
                 <h4>
                    State :
                 </h4>
                <p> 6oct</p>
                <hr/>
                 <h4>
                     Zip Code :
                 </h4>
                 <p> 11062</p>
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
  
