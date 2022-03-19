import React, { useEffect,useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./deals.css";
import DealsCard from "../../components/dealsCard/DealsCard";
import { useHistory } from "react-router-dom";
import { getDeals } from "../../Store/Actions/getDeals";
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { getOffersAction } from "../../Store/Actions/getOffers";
import { getPosts } from '../../Store/Actions/getPosts'
export default function Deals() {
  const dispatch = useDispatch();
  const offersArray = useSelector((state) => state.OFFERS.offers); //[]
  const posts = useSelector((state) => state.POSTS.postsList)
  const history = useHistory();
  useEffect(() => {
    dispatch(getPosts())  
  }, []);

  const [MyOffers, setMyOffers] = useState([]);
  const [CloseAlert, setCloseAlert] = useState(false);

const getmyDealssListFun = () => {
    let myOffersList = []
    let myPostsList =[]
    console.log("AllPosts" , posts)
    console.log("AllOffers" , offersArray)
  
      for( let p of posts){
        console.log("p" , p)
        console.log("localStorage.getItem(" , localStorage.getItem("id"))
          if(p.user == localStorage.getItem("id")){
              myPostsList.push(p.id)
          }
      }
      console.log("myPostsList" , myPostsList)
     for (let o of offersArray ){
         console.log("o" , o)
         if(myPostsList.includes(o.post))
         {
             console.log("****************************", o)
             myOffersList.push(o)
         }
         else{
           if(o.offer_owner == localStorage.getItem("id")){
            myOffersList.push(o)
           }
         }
 
     }

    console.log("myOffersList",myOffersList)
         setMyOffers(myOffersList)
        setCloseAlert(true)
    
}

  // console.log(deals, "//////////////");
  return (
    <>
    {localStorage.getItem("email") ? (
   <>
   <Navbar />
           {!CloseAlert &&
             <SweetAlert title="Do you want to show your deals " onConfirm={()=>{ getmyDealssListFun()}}  />
            
            }
        <DealsCard deals={MyOffers} />

   </>
    ) : history.push("/login")}
   
    </>
  );
}
