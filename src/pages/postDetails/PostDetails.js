// import axios from 'axios';
import React from "react"

import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import PostCard from '../../components/postCard/postCard'
import Navbar from '../../components/navbar/navbar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from '../../Store/Actions/getPosts'
// import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useHistory } from 'react-router-dom';
import { getOffersAction } from "../../Store/Actions/getOffers";
import SweetAlert from 'react-bootstrap-sweetalert';
import OffersCard from "../../components/card/offerCard"

export default function PostDetails() {
  const history = useHistory();
  const posts = useSelector((state) => state.POSTS.postsList)
  const dispatch = useDispatch();
  const params = useParams();   // return object for dynamic params  like /:id
  const [details, setDetails] = useState({})  //to store returned data
  const offers = useSelector((state) => state.OFFERS.offers);
  useEffect(() => {
    dispatch(getPosts())
    dispatch(getOffersAction());

    
  }, [])
  
///////////////////////////////////////////////////////////
const [MyOffers, setMyOffers] = useState([]);
const [CloseAlert, setCloseAlert] = useState(false);
const getmyOffersListFun = () => {
    let myOffersList = []
    console.log("AllOffers" , offers)
     for (let o of offers ){
         if(o.post == params.id )
         {
             myOffersList.push(o)
             setMyOffers((prev)=>[...prev,o])
         }
     }
    console.log("myOffersList",myOffersList)
         setMyOffers(myOffersList)
         setCloseAlert(true)
}
///////////////////////////////////////////////////////////
  return (
    <>
    { localStorage.getItem("email") ? (
      <>
 <Navbar />
 <div class="post-page">
      <div className="container mx-auto px-10 mb-8 ">
           {!CloseAlert &&
             <SweetAlert title="Do you want to show  offers of this post? " onConfirm={()=>{ getmyOffersListFun()}}  />
            
            }
            <OffersCard offers={MyOffers} />
      </div>
      </div>
      </>
    ) : history.push("/login")}
    </>
  )
}
