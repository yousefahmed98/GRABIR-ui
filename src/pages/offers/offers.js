import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import OffersCard from "../../components/card/offerCard";

export default function Offers(props) {
  const offersArray = useSelector((state) => state.OFFERS.offers); //[]
  console.log("oferrrs", offersArray);
  return (
    <>
      <Navbar />

      {console.log("heeeeeeeeeeeey")}
      <OffersCard offers={offersArray} />
    </>
  );
}
