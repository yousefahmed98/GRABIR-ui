import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import OffersCard from "../../components/card/offerCard";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useHistory } from "react-router-dom";

export default function Offers(props) {
  const history = useHistory();
  const offersArray = useSelector((state) => state.OFFERS.offers); //[]
  console.log("oferrrs", offersArray);
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
