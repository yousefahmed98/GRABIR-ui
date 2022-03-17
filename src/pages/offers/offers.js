import React from "react"
import {useEffect} from "react";
import { useSelector ,useDispatch} from "react-redux";
import Navbar from "../../components/navbar/navbar";
import OffersCard from "../../components/card/offerCard";
// import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useHistory } from "react-router-dom";
import { getOffersAction } from '../../Store/Actions/getOffers'
export default function Offers(props) {
  const history = useHistory();
  //get all offers
  const offersArray = useSelector((state) => state.OFFERS.offers); //[]
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffersAction())
    console.log("oferrrs", offersArray);
  
}, []);
  
  return (
    <>
      {localStorage.getItem("email") ? (
        <>
          <Navbar />
          <OffersCard offers={offersArray} />
        </>
      ) : history.push("/login")}
    </>
  );
}
