import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./deals.css";
import DealsCard from "../../components/dealsCard/DealsCard";
import { axiosInstance } from "../../network/axiosInstance";
import FormControl from '@mui/material/FormControl';
import NotLoggedIn from '../../components/NotLoggedIn/NotLoggedIn'
import { useHistory } from "react-router-dom";
import { getDeals } from "../../Store/Actions/getDeals";
import { useSelector, useDispatch } from "react-redux"

export default function Deals() {
  const dispatch = useDispatch();
  const [deals, setDeals] = useState();
  const history = useHistory();
  useEffect(() => {
    dispatch(getDeals())
      
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
