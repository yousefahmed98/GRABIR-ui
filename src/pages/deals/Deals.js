import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./deals.css";
import DealsCard from "../../components/dealsCard/DealsCard";
import { axiosInstance } from "../../network/axiosInstance";
import FormControl from '@mui/material/FormControl';
import NotLoggedIn from '../../components/NotLoggedIn/NotLoggedIn'
import { useHistory } from "react-router-dom";
export default function Deals() {
  const [deals, setDeals] = useState();
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get("/deals/",{
        headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${localStorage.getItem("access")}`,
            Accept: "application/json",
        }})
      .then((res) => setDeals(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(deals, "//////////////");
  return (
    <>
    {localStorage.getItem("email") ? (
   <>
   <Navbar />
   <DealsCard deals={deals}/>
   </>
    ) : history.push("/login")}
   
    </>
  );
}
