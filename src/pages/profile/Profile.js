import React, { useState } from "react";
import { Tabs, Tab, Stack } from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import Btnpic from "./Btnpicture";
import CardHeader from "@mui/material/CardHeader";
import Edit from "./Edit";
import Editadd from "./Edit copy";
import "./profile.css";
import StarRating from "../../components/StarRating/StarRating";
export default function Profile() {
  const [key, setKey] = useState("home");

  return (
    <>
    <Navbar />
    <div className="profile mt-5">
    
      <div className=" tabsssss">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mt-4 "
        >
          <Tab eventKey="home" title="BASIC INFORMATION" className="tab titleProfile">
            <>
              <Stack direction="horizontal" gap={4}>
                <div className="">
                  <CardHeader
                    avatar={
                      <img
                        src={localStorage.getItem("ProfilePic")}
                        className="mb-1 userImage"
                        height="120"
                        alt="deal owner"
                        loading="lazy"
                      />
                    }
                  />
                </div>
                <div className="">
                  {" "}
                  <div className="py-5"><Btnpic /></div>
                </div>
              </Stack>
              <hr />

              <div className="mb-2">{/* <Picture  /> */}</div>
              <div>
                <h4>Firstname :</h4>
                <p className="text-capitalize">
                  {" "}
                  {localStorage.getItem("firstname")}
                </p>
                <hr className="text-dark"/>
                <h4>Lastname :</h4>
                <p className="text-capitalize">
                  {" "}
                  {localStorage.getItem("lastname")}
                </p>
                <hr className="text-dark"/>
                <h4>Username :</h4>
                <p className="text-capitalize">
                  {" "}
                  {localStorage.getItem("username")}{" "}
                </p>
                <hr className="text-dark"/>
                <h4>Region :</h4>
                <p className="text-capitalize">
                  {" "}
                  {localStorage.getItem("region")}{" "}
                </p>
                <hr className="text-dark" />
              </div>
              <br />
              <br />
              <Edit />
            </>
          </Tab>

          {/*  TAB 2 */}
          <Tab eventKey="profile" title=" Security Information" className="tab">
            <>
              <div>
                {/* <h4>ID :</h4>
                <p> {localStorage.getItem("id")}</p>
                <hr /> */}
                <h4>Email :</h4>
                <p className="text-capitalize">
                  {" "}
                  {localStorage.getItem("email")}{" "}
                </p>
         
                <hr className="text-dark"/>
                <h4>Date joined :</h4>
                <p> {localStorage.getItem("dateJoined")} </p>
                <hr className="text-dark"/>
                <h4>Email verfied :</h4>
                <p>
                  {" "}
                  {localStorage.getItem("isVerfied") === "true"
                    ? "Yes"
                    : "No"}{" "}
                </p>
                <hr className="text-dark"/>
              </div>
              <br />
              <br />
              {/* <Editadd /> */}
            </>
          </Tab>
          <Tab eventKey="review" title="Reviews" className="tab">
            <>
              <h3 className="text-dark">Rates & comments : </h3>
              <hr className="text-dark"/>
              <StarRating />
            </>
          </Tab>
        </Tabs>
      </div>
    </div>
    </>
  );
}
