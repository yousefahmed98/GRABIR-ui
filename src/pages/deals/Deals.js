import React, { useEffect,useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./deals.css";
import DealsCard from "../../components/dealsCard/DealsCard";
import { useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../../Store/Actions/getPosts'
export default function Deals() {
  const dispatch = useDispatch();
  const offersArray = useSelector((state) => state.OFFERS.offers); //[]
  const posts = useSelector((state) => state.POSTS.postsList)
  const history = useHistory();
  useEffect(() => {
    dispatch(getPosts())  
  }, [dispatch]);

  const [MyOffers, setMyOffers] = useState([]);
  const [CloseAlert, setCloseAlert] = useState(false);

const getmyDealssListFun = () => {
    let myOffersList = []
    let myPostsList =[]
      
      for( let p of posts){
          if(p.user == localStorage.getItem("id")){
              myPostsList.push(p.id)
          }
      }
     for (let o of offersArray ){
         if(myPostsList.includes(o.post))
         {
             myOffersList.push(o)
         }
         else{
           if(o.offer_owner === localStorage.getItem("id")){
            myOffersList.push(o)
           }
         }
 
     }

         setMyOffers(myOffersList)
        setCloseAlert(true)
    
}
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
