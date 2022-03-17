import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./deals.css";
import DealsCard from "../../components/dealsCard/DealsCard";
import { useHistory } from "react-router-dom";
import { getDeals } from "../../Store/Actions/getDeals";
import {  useDispatch } from "react-redux"

export default function Deals() {
  const dispatch = useDispatch();
  // const [deals, setDeals] = useState();
  const history = useHistory();
  useEffect(() => {
    dispatch(getDeals())
      
  }, []);

  // console.log(deals, "//////////////");
  return (
    <>
    {localStorage.getItem("email") ? (
   <>
   <Navbar />
   {/* <DealsCard deals={deals}/> */}
   <DealsCard />

   </>
    ) : history.push("/login")}
   
    </>
  );
}
