import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./deals.css";
import DealsCard from "../../components/dealsCard/DealsCard";
import { axiosInstance } from "../../network/axiosInstance";
import FormControl from '@mui/material/FormControl';

export default function Deals() {
  const [deals, setDeals] = useState();
  useEffect(() => {
    axiosInstance
      .get("/deals")
      .then((res) => setDeals(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(deals);
  return (
    <>
      <Navbar />
      <DealsCard deals={deals}/>
    </>
  );
}
